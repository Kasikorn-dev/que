import { relations, sql } from "drizzle-orm";
import {
	index,
	integer,
	pgPolicy,
	text,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { createTable, timestamps } from "../lib/utils";
import { users } from "./users";
import { lessons } from "./lessons";

// --- Tables ---

export const courses = createTable(
	"course",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		title: varchar("title", { length: 256 }).notNull(),
		description: text("description"),
		sourceText: text("source_text"), // The original input
		...timestamps,
		createdBy: uuid("created_by").references(() => users.id),
		updatedBy: uuid("updated_by").references(() => users.id),
	},
	(t) => [
		index("course_user_idx").on(t.userId),
		pgPolicy("courses_policy", {
			as: "permissive",
			for: "all",
			to: ["authenticated"],
			using: sql`auth.uid() = ${t.userId}`,
			withCheck: sql`auth.uid() = ${t.userId}`,
		}),
	],
);

// --- Relations ---

export const coursesRelations = relations(courses, ({ one, many }) => ({
	owner: one(users, {
		fields: [courses.userId],
		references: [users.id],
	}),
	lessons: many(lessons),
}));
