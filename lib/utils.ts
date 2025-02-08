import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getAcronym = (name: string) => {
	// Get first and last name
	const tokens = name.split(" ");
	const [first, last] = [tokens.shift(), tokens.pop()];

	return first![0].toUpperCase() + last![0].toUpperCase();
};

export const computeSHA256 = async (file: File) => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};
