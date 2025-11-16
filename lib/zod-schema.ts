import { z } from "zod";

/**
 * Validation schema for user registration form
 *
 * @remarks
 * Validates:
 * - Name: Required, non-empty after trimming whitespace
 * - Email: Must be a valid email format
 * - Password: Minimum 8 characters with at least 1 number
 * - Image: Optional profile image URL
 *
 * Used with form libraries like React Hook Form for client-side validation.
 */
export const signUpSchema = z.object({
	name: z.string().trim().min(1, {
		message: "Name is required",
	}),
	email: z.string().trim().email({ message: "Email address must be valid" }),
	password: z
		.string()
		.min(8, {
			message:
				"Password must contain at least 8 characters (including 1 number)",
		})
		.regex(/\d/, {
			message: "Password must contain at least 1 number",
		}),
	image: z.string().nullable(),
});

/**
 * Validation schema for user login form
 *
 * @remarks
 * Validates:
 * - Email: Must be a valid email format
 * - Password: Must not be empty
 *
 * Simpler validation than signup since authentication will validate
 * actual credentials on the server.
 */
export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

/**
 * Validation schema for audio bar cookie data
 */
export const audioBarCookieSchema = z.object({
	songID: z.string().min(1),
	songName: z.string().min(1),
	artist: z.string().min(1),
	album: z.string().min(1),
	year: z.string().min(1),
	albumArt: z.string().min(1),
	audioSrc: z.string().min(1),
	isLiked: z.string().refine((val) => val === "true" || val === "false", {
		message: "isLiked must be 'true' or 'false'",
	}),
	volume: z.preprocess(
		(vol) => parseFloat(vol as string),
		z.number().positive().max(1)
	),
});
