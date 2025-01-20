import { z } from "zod";

export const signUpSchema = {
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(1),
	image: z.string().nullable(),
};
