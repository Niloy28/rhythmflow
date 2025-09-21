import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and deduplicates CSS class names using clsx and tailwind-merge
 *
 * @param inputs - Class values to combine
 * @returns Merged and deduplicated class string
 *
 * @remarks
 * Prevents Tailwind CSS class conflicts by merging classes intelligently.
 * Commonly used pattern in shadcn/ui components.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Generates a two-letter acronym from a person's name
 *
 * @param name - Full name string (first and last name)
 * @returns Two-letter uppercase acronym
 *
 * @remarks
 * Takes the first letter of the first word and first letter of the last word.
 * Used for generating avatar fallbacks when no profile image is available.
 *
 * @example
 * ```typescript
 * getAcronym("John Doe") // returns "JD"
 * getAcronym("Mary Jane Watson") // returns "MW"
 * ```
 */
export const getAcronym = (name: string) => {
	// Get first and last name
	const tokens = name.split(" ");
	const [first, last] = [tokens.shift(), tokens.pop()];

	return first![0].toUpperCase() + last![0].toUpperCase();
};

/**
 * Capitalizes the first letter of a string
 *
 * @param str - Input string to capitalize
 * @returns String with first letter capitalized
 *
 * @remarks
 * Used for formatting text display, particularly for form inputs and labels.
 */
export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Computes SHA256 hash of a file for integrity verification
 *
 * @param file - File object to hash
 * @returns Promise resolving to hex-encoded SHA256 hash
 *
 * @remarks
 * Uses the Web Crypto API for secure hashing. Required for R2 upload
 * integrity verification and checksum validation.
 */
export const computeSHA256 = async (file: File) => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

/**
 * Shuffles an array in-place using Fisher-Yates algorithm
 *
 * @param array - Array to shuffle (modified in-place)
 * @returns void - The input array is modified directly
 *
 * @remarks
 * Used for randomizing playlist order and creating shuffle functionality.
 * Modifies the original array rather than creating a copy.
 *
 * @example
 * ```typescript
 * const songs = [1, 2, 3, 4, 5];
 * shuffleArray(songs);
 * // songs is now randomly reordered
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

/**
 * Formats duration in seconds to MM:SS format
 *
 * @param duration - Duration in seconds
 * @returns Formatted time string in MM:SS format
 *
 * @remarks
 * Used for displaying song lengths in playlists and player controls.
 * Ensures seconds are always zero-padded to two digits.
 *
 * @example
 * ```typescript
 * getFormattedDuration(183) // returns "3:03"
 * getFormattedDuration(65)  // returns "1:05"
 * ```
 */
export const getFormattedDuration = (duration: number) => {
	const minutes = Math.floor(duration / 60);
	const seconds = duration % 60;

	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * Formats time with NaN handling for audio player display
 *
 * @param time - Time in seconds (may be NaN)
 * @returns Formatted time string in M:SS format, or "0:00" if NaN
 *
 * @remarks
 * Similar to getFormattedDuration but includes NaN handling for cases
 * where audio metadata hasn't loaded yet. Used in real-time audio players.
 *
 * @example
 * ```typescript
 * formatTime(125)    // returns "2:05"
 * formatTime(NaN)    // returns "0:00"
 * formatTime(0)      // returns "0:00"
 * ```
 */
export const formatTime = (time: number) => {
	if (isNaN(time)) return "0:00";

	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);

	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
