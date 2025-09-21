import { env } from "@/env/server";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import { dialect } from "./dialect";

/**
 * Server-side authentication instance with database integration
 *
 * @remarks
 * Configures Better Auth with:
 * - SQLite database using custom dialect
 * - Email/password authentication
 * - Google OAuth integration
 * - OpenAPI plugin for API documentation
 * - Next.js cookie handling
 */
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
