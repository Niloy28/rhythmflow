import { z } from "zod";

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

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});
