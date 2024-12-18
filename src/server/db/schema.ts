// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm"
import { int, integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core"
import type { StatusType } from "./types"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `job-tracker_${name}`)

const baseSchema = {
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer("updated_at", { mode: "timestamp" }),
	deletedAt: integer("deleted_at", { mode: "timestamp" }),
}

export const applications = createTable("applications", {
	id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	userId: text("user_id").notNull(),
	companyName: text("company_name", { length: 256 }).notNull(),
	vacancyTitle: text("vacancy_title", { length: 256 }).notNull(),
	vacancyUrl: text("vacancy_url", { length: 256 }).notNull(),
	status: text("status").$type<StatusType>().notNull(),
	files: text("files", { length: 256 }).notNull(),
	...baseSchema,
})
