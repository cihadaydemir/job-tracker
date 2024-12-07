// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
	index,
	int,
	integer,
	sqliteTableCreator,
	text,
} from "drizzle-orm/sqlite-core";
import { z } from "zod";
import type { StatusType } from "./types";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `job-tracker_${name}`);

export const posts = createTable(
	"post",
	{
		id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
		name: text("name", { length: 256 }),
		createdAt: int("created_at", { mode: "timestamp" })
			.default(sql`(unixepoch())`)
			.notNull(),
		updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
			() => new Date(),
		),
	},
	(example) => ({
		nameIndex: index("name_idx").on(example.name),
	}),
);
const baseSchema = {
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer("updated_at", { mode: "timestamp" }),
	deletedAt: integer("deleted_at", { mode: "timestamp" }),
};

export const applications = createTable("applications", {
	id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	companyName: text("company_name", { length: 256 }).notNull(),
	vacancyUrl: text("vacancy_url", { length: 256 }),
	status: text("status").$type<StatusType>().notNull(),
	files: text("files", { length: 256 }),
	...baseSchema,
});
