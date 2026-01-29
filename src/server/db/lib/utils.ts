import { sql } from "drizzle-orm";
import { pgTableCreator, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name: string) => `${name}`);

export const timestamps = {
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdate(() => new Date()),
};
