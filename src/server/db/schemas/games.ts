import { relations, sql } from "drizzle-orm";
import { index, integer, jsonb, pgEnum, pgPolicy } from "drizzle-orm/pg-core";
import { baseSchema, createTable } from "../lib/utils";
import { courses } from "./courses";
import { lessons } from "./lessons";

export const gameTypeEnum = pgEnum("game_type", ["quiz", "flashcard"]);

export const games = createTable(
	"game",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
		lessonId: integer("lesson_id")
			.notNull()
			.references(() => lessons.id, { onDelete: "cascade" }),
		type: gameTypeEnum("type").notNull(),
		data: jsonb("data").notNull(), // Unified Structure: { question, answer, options, explanation }
		order: integer("order").notNull(),
		...baseSchema,
	},
	(t) => [
		index("game_lesson_idx").on(t.lessonId),
		pgPolicy("games_policy", {
			as: "permissive",
			for: "all",
			to: ["authenticated"],
			using: sql`exists (
				select 1 from ${lessons}
				join ${courses} on ${lessons.courseId} = ${courses.id}
				where ${lessons.id} = ${t.lessonId}
				and ${courses.userId} = auth.uid()
			)`,
			withCheck: sql`exists (
				select 1 from ${lessons}
				join ${courses} on ${lessons.courseId} = ${courses.id}
				where ${lessons.id} = ${t.lessonId}
				and ${courses.userId} = auth.uid()
			)`,
		}),
	],
);

export const gamesRelations = relations(games, ({ one }) => ({
	lesson: one(lessons, {
		fields: [games.lessonId],
		references: [lessons.id],
	}),
}));
