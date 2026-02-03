import { relations, sql } from "drizzle-orm";
import {
	index,
	integer,
	pgEnum,
	pgPolicy,
	text,
	varchar,
} from "drizzle-orm/pg-core";
import { createTable, timestamps } from "../lib/utils";
import { courses } from "./courses";
import { games } from "./games";

export const lessonStatusEnum = pgEnum("lesson_status", [
	"pending",
	"generating",
	"completed",
	"failed",
]);

export const lessons = createTable(
	"lesson",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
		courseId: integer("course_id")
			.notNull()
			.references(() => courses.id, { onDelete: "cascade" }),
		order: integer("order").notNull(),
		title: varchar("title", { length: 256 }).notNull(),
		content: text("content"), // Markdown content (can be null initially)
		status: lessonStatusEnum("status").default("pending").notNull(),
		...timestamps,
	},
	(t) => [
		index("lesson_course_idx").on(t.courseId),
		pgPolicy("lessons_policy", {
			as: "permissive",
			for: "all",
			to: ["authenticated"],
			using: sql`exists (
				select 1 from ${courses}
				where ${courses.id} = ${t.courseId}
				and ${courses.userId} = auth.uid()
			)`,
			withCheck: sql`exists (
				select 1 from ${courses}
				where ${courses.id} = ${t.courseId}
				and ${courses.userId} = auth.uid()
			)`,
		}),
	],
);

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
	course: one(courses, {
		fields: [lessons.courseId],
		references: [courses.id],
	}),
	games: many(games),
}));
