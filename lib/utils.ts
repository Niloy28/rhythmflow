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

export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const computeSHA256 = async (file: File) => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

export const getFormattedDuration = (duration: number) => {
	const minutes = Math.floor(duration / 60);
	const seconds = duration % 60;

	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
