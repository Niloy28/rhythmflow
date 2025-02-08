import { z } from "zod";
import { imageTypes } from "./constants";

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

export const artistSchema = z.object({
	name: z.string().min(1, "Name is required"),
	image: z
		.instanceof(FileList)
		.refine((files) => files.length > 0, "Image is required")
		.refine((files) => {
			return files[0].size < 1024 * 1024 * 5;
		}, "Image must be less than 5MB")
		.refine(
			(files) => imageTypes.includes(files[0].type),
			"Image must be a jpeg, png or webp"
		),
});
