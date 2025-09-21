import { env } from "@/env/server";
import { LibsqlDialect } from "@libsql/kysely-libsql";

/**
 * Database dialect configuration for Turso (LibSQL)
 *
 * @remarks
 * Configures the connection to Turso database using LibSQL dialect.
 * Requires TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables.
 */
export const dialect = new LibsqlDialect({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN,
});
