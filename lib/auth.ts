import { env } from "@/env/server";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";

const dialect = new LibsqlDialect({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN,
});

export const auth = betterAuth({
	plugins: [openAPI(), nextCookies()],
	database: {
		dialect,
		type: "sqlite",
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
});
