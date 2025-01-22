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
