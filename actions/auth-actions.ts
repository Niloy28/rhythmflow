"use server";

import { auth } from "@/lib/auth";

export const signIn = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		throw new Error("Email and password are required");
	}

	await auth.api.signInEmail({
		body: {
			email,
			password,
		},
	});
};

export const signUp = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const name = formData.get("name") as string;
	const password = formData.get("password") as string;
	const image = formData.get("image") as string;

	if (!email || !name || !password) {
		throw new Error("Email, name, and password are required");
	}

	await auth.api.signUpEmail({
		body: {
			email,
			name,
			password,
		},
		image,
	});
};
