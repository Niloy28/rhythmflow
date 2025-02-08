import { env } from "@/env/server";
import { LibsqlDialect } from "@libsql/kysely-libsql";

export const dialect = new LibsqlDialect({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN,
});
