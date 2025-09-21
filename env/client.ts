import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Type-safe client-side environment variables configuration
 *
 * @remarks
 * Validates and exposes environment variables that are safe to use
 * in client-side code (browser). These variables are prefixed with
 * NEXT_PUBLIC_ and are bundled into the client JavaScript.
 *
 * Only includes variables that are safe for public exposure:
 * - API endpoints that are meant to be called from the browser
 * - Public configuration values
 */
export const env = createEnv({
	client: {
		/** Base URL for the Better Auth authentication server */
		NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
	},
});
