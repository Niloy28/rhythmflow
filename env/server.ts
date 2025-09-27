import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Type-safe server-side environment variables configuration
 *
 * @remarks
 * Validates and exposes environment variables for server-side use only.
 * These variables contain sensitive information like API keys, database
 * credentials, and OAuth secrets that should never be exposed to clients.
 *
 * Categories of variables:
 * - Authentication: Better Auth configuration and OAuth credentials
 * - Database: Turso connection details
 * - Storage: Cloudflare R2 bucket configuration and credentials
 * - Limits: File size constraints for uploads
 *
 * All string-based file sizes are transformed to numbers with validation
 * to ensure they are positive integers.
 */
export const env = createEnv({
	server: {
		/** Base URL for Better Auth server endpoints */
		BETTER_AUTH_URL: z.string().url(),
		/** Secret key for Better Auth session encryption */
		BETTER_AUTH_SECRET: z.string().min(1),
		/** Connection URL for Turso SQLite database */
		TURSO_DATABASE_URL: z.string().url(),
		/** Authentication token for Turso database access */
		TURSO_AUTH_TOKEN: z.string().min(1),
		/** Google OAuth client ID for social authentication */
		GOOGLE_CLIENT_ID: z.string().min(1),
		/** Google OAuth client secret for social authentication */
		GOOGLE_CLIENT_SECRET: z.string().min(1),
		/** Public URL base for accessing song files */
		R2_PUBLIC_SONG_URL: z.string().url(),
		/** Public URL base for accessing artist images */
		R2_PUBLIC_ARTIST_URL: z.string().url(),
		/** Public URL base for accessing album artwork */
		R2_PUBLIC_ALBUM_URL: z.string().url(),
		/** Cloudflare R2 access key ID for API authentication */
		R2_ACCESS_ID: z.string().min(1),
		/** Cloudflare R2 secret access key for API authentication */
		R2_ACCESS_SECRET: z.string().min(1),
		/** Cloudflare account ID for R2 service */
		R2_ACCOUNT_ID: z.string().min(1),
		/** R2 bucket name for storing artist profile images */
		ARTIST_BUCKET_NAME: z.string().min(1),
		/** R2 bucket name for storing album artwork */
		ALBUM_BUCKET_NAME: z.string().min(1),
		/** R2 bucket name for storing audio files */
		SONG_BUCKET_NAME: z.string().min(1),
		/** Maximum allowed size for image uploads in bytes */
		IMAGE_MAX_SIZE: z
			.string()
			.transform((val) => parseInt(val))
			.pipe(z.number().int().positive()),
		/** Maximum allowed size for audio file uploads in bytes */
		SONG_MAX_SIZE: z
			.string()
			.transform((val) => parseInt(val))
			.pipe(z.number().int().positive()),
	},
	runtimeEnv: {
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
		TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		R2_PUBLIC_SONG_URL: process.env.R2_PUBLIC_SONG_URL,
		R2_PUBLIC_ARTIST_URL: process.env.R2_PUBLIC_ARTIST_URL,
		R2_PUBLIC_ALBUM_URL: process.env.R2_PUBLIC_ALBUM_URL,
		R2_ACCESS_ID: process.env.R2_ACCESS_ID,
		R2_ACCESS_SECRET: process.env.R2_ACCESS_SECRET,
		R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
		ARTIST_BUCKET_NAME: process.env.ARTIST_BUCKET_NAME,
		ALBUM_BUCKET_NAME: process.env.ALBUM_BUCKET_NAME,
		SONG_BUCKET_NAME: process.env.SONG_BUCKET_NAME,
		IMAGE_MAX_SIZE: process.env.IMAGE_MAX_SIZE,
		SONG_MAX_SIZE: process.env.SONG_MAX_SIZE,
	},
});
