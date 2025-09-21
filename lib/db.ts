import { DB } from "@/types/db";
import { Kysely } from "kysely";
import { dialect } from "./dialect";

/**
 * Database connection instance using Kysely query builder
 *
 * @remarks
 * Provides type-safe database operations using the custom dialect
 * configuration. All database queries throughout the application
 * should use this instance.
 */
const db = new Kysely<DB>({
	dialect,
});

export default db;
