import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { courses, lessons } from "@/server/db/schemas";
import { courseGenerationSchema } from "./ai-schemas";

export const courseRouter = createTRPCRouter({
	/**
	 * สร้าง course ใหม่พร้อม generate lessons ด้วย AI
	 */
	create: protectedProcedure
		.input(
			z.object({
				text: z.string().min(10, "กรุณากรอกเนื้อหาอย่างน้อย 10 ตัวอักษร"),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			// 1. Generate course + lessons ด้วย AI
			const result = await generateObject({
				model: google("gemini-2.5-flash"),
				schema: courseGenerationSchema,
				prompt: `Create an online course from the following content:

"${input.text}"

CRITICAL FORMATTING RULES:
1. Use proper Markdown syntax:
   - Headings: # Title, ## Section, ### Subsection
   - Bold: **text** (must have closing **)
   - Italic: *text* (must have closing *)
   - Lists: Start with * or - followed by space
   
2. Line breaks (VERY IMPORTANT):
   - Add TWO newlines (\\n\\n) between paragraphs
   - Add TWO newlines before and after headings
   - Add TWO newlines before and after lists
   - Add ONE newline between list items
   
3. Content structure:
   - Create an engaging course title
   - Write a clear course description
   - Generate 5 lessons (easy to hard)
   - Each lesson: 500-1000 words
   
4. AVOID:
   - Don't use ** without closing it
   - Don't add extra * at the start of paragraphs
   - Don't mix list formats
   
Example format:
# Heading

This is a paragraph with **bold text** and *italic text*.

## Subheading

Another paragraph here.

* List item 1
* List item 2
* List item 3

Next paragraph after list.`,
			});

			// 2. บันทึก course ลง database
			const [course] = await ctx.db
				.insert(courses)
				.values({
					userId: ctx.user.id,
					title: result.object.title,
					description: result.object.description,
					sourceText: input.text,
				})
				.returning();

			if (!course) {
				throw new Error("Failed to create course");
			}

			// 3. บันทึก lessons ลง database
			await ctx.db.insert(lessons).values(
				result.object.lessons.map((lesson, index) => ({
					courseId: course.id,
					order: index + 1,
					title: lesson.title,
					description: lesson.description,
					content: lesson.content,
					status: "completed" as const,
				})),
			);

			return { courseId: course.id };
		}),

	/**
	 * ดึงข้อมูล course พร้อม lessons
	 */
	getById: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ ctx, input }) => {
			const course = await ctx.db.query.courses.findFirst({
				where: eq(courses.id, input.id),
				with: {
					lessons: {
						orderBy: (lessons, { asc }) => [asc(lessons.order)],
					},
				},
			});

			if (!course) {
				throw new Error("Course not found");
			}

			// ตรวจสอบ ownership
			if (course.userId !== ctx.user.id) {
				throw new Error("Unauthorized");
			}

			return course;
		}),

	/**
	 * ดึงรายการ courses ทั้งหมดของผู้ใช้
	 */
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const userCourses = await ctx.db.query.courses.findMany({
			where: eq(courses.userId, ctx.user.id),
			with: {
				lessons: true,
			},
			orderBy: (courses, { desc }) => [desc(courses.createdAt)],
		});

		return userCourses;
	}),
});
