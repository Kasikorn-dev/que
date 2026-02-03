import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { courses, lessons, games } from "@/server/db/schemas";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm"; // Added for `eq` in update statements

const google = createGoogleGenerativeAI({
	apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// AI Response Schema for Outline
const courseOutlineSchema = z.object({
	title: z.string(),
	description: z.string(),
	lessons: z.array(z.object({ title: z.string() })),
});

// AI Response Schema for Lesson Content
const gameSchema = z.object({
	type: z.enum(["quiz", "flashcard"]),
	data: z.any(),
});

const lessonContentSchema = z.object({
	content: z.string(),
	games: z.array(gameSchema),
});

export const courseRouter = createTRPCRouter({
	generate: protectedProcedure
		.input(z.object({ text: z.string().min(1) }))
		.mutation(async ({ ctx, input }) => {
			const { text } = input;
			const startTime = performance.now();

			try {
				// 1. Call AI for Outline
				const result = await generateObject({
					model: google("gemini-2.5-flash"),
					schema: courseOutlineSchema,
					prompt: `Generate a course outline about: ${text}. 
					Requirements:
					1. Create exactly 10 comprehensive lesson titles.
					2. Do NOT generate content yet, just titles.`,
				});

				const aiData = result.object;
				const duration = (performance.now() - startTime) / 1000;
				console.log(`✅ AI Outline Generation took ${duration.toFixed(2)}s`);

				// 2. Save to DB (Transaction)
				return await ctx.db.transaction(async (tx) => {
					// Insert Course
					const [newCourse] = await tx
						.insert(courses)
						.values({
							userId: ctx.user.id,
							title: aiData.title,
							description: aiData.description,
							sourceText: text,
						})
						.returning();

					if (!newCourse)
						throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

					// Insert Lessons (Pending Status)
					for (const [index, lesson] of aiData.lessons.entries()) {
						await tx.insert(lessons).values({
							courseId: newCourse.id,
							order: index + 1,
							title: lesson.title,
							status: "pending", // Default status
						});
					}

					return { courseId: newCourse.id };
				});
			} catch (error) {
				console.error("AI Generation Error:", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to generate course",
				});
			}
		}),

	generateLesson: protectedProcedure
		.input(z.object({ lessonId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const { lessonId } = input;

			// 1. Get Lesson & Course Info
			const lesson = await ctx.db.query.lessons.findFirst({
				where: (t, { eq }) => eq(t.id, lessonId),
				with: {
					course: true,
				},
			});

			if (!lesson || !lesson.course) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			// Prevent duplicate generation
			if (lesson.status !== "pending" && lesson.status !== "failed") {
				return {
					success: false,
					message: "Lesson is already generated or generating",
				};
			}

			// 2. Update Status to Generating
			await ctx.db
				.update(lessons)
				.set({ status: "generating" })
				.where(eq(lessons.id, lessonId));

			try {
				// 3. Call AI for Content
				const result = await generateObject({
					model: google("gemini-2.0-flash"),
					schema: lessonContentSchema,
					prompt: `Generate content for the lesson "${lesson.title}" in the course "${lesson.course.title}".
					Context: ${lesson.course.description}
					Requirements:
					1. Content should be educational, engaging, and formated as plain text or simple HTML (NO MARKDOWN).
					2. Create exactly 10 games (quiz or flashcard) relevant to this lesson.`,
				});

				const aiData = result.object;

				// 4. Save Content & Games
				await ctx.db.transaction(async (tx) => {
					await tx
						.update(lessons)
						.set({
							content: aiData.content,
							status: "completed",
						})
						.where(eq(lessons.id, lessonId));

					// Insert Games
					for (const [gIndex, game] of aiData.games.entries()) {
						await tx.insert(games).values({
							lessonId: lessonId,
							order: gIndex + 1,
							type: game.type,
							data: game.data,
						});
					}
				});

				return { success: true };
			} catch (error) {
				console.error(`Failed to generate lesson ${lessonId}:`, error);
				await ctx.db
					.update(lessons)
					.set({ status: "failed" })
					.where(eq(lessons.id, lessonId));
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to generate lesson content",
				});
			}
		}),

	getById: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ ctx, input }) => {
			const course = await ctx.db.query.courses.findFirst({
				where: (t, { eq }) => eq(t.id, input.id),
				with: {
					lessons: {
						orderBy: (t, { asc }) => [asc(t.order)],
					},
				},
			});

			if (!course) throw new TRPCError({ code: "NOT_FOUND" });

			return course;
		}),
});
