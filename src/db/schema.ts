import { sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const subscriptionsTable = sqliteTable("subscriptions", {
	id: t.integer().primaryKey({ autoIncrement: true }),
	email: t.text().notNull(),
	createdAt: t.integer().notNull().default(sql`(strftime('%s', 'now'))`),
});

export const countTable = sqliteTable("count", {
	value: t.integer().notNull().default(0),
	lastChanged: t.integer().notNull().default(sql`(strftime('%s', 'now'))`),
});
