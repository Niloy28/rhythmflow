"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers } from "next/headers";

/**
 * Adds a song to the current user's liked songs playlist
 * @param formData - FormData containing the song ID to like
 */
export const likeSong = async (formData: FormData) => {
	const songID = formData.get("song_id") as string;

	// Get current authenticated user's ID from session
	const userID = (await auth.api.getSession({ headers: await headers() }))!.user
		.id!;

	// Insert like record into liked_songs table
	await db
		.insertInto("liked_songs")
		.values({
			song_id: parseInt(songID),
			user_id: userID,
		})
		.execute();
};

/**
 * Removes a song from the current user's liked songs playlist
 * @param formData - FormData containing the song ID to unlike
 */
export const removeSongLike = async (formData: FormData) => {
	const songID = formData.get("song_id") as string;

	// Remove like record from liked_songs table
	await db
		.deleteFrom("liked_songs")
		.where("song_id", "=", parseInt(songID))
		.execute();
};

/**
 * Adds a song to the current user's watch later playlist
 * @param songID - The ID of the song to add to watch later
 */
export const addToWatchLater = async (songID: number) => {
	// Get current authenticated user's ID from session
	const userID = (await auth.api.getSession({ headers: await headers() }))!.user
		.id!;

	// Insert record into watch_later table
	await db
		.insertInto("watch_later")
		.values({
			song_id: songID,
			user_id: userID,
		})
		.execute();
};

/**
 * Removes a song from the current user's watch later playlist
 * @param songID - The ID of the song to remove from watch later
 */
export const removeFromWatchLater = async (songID: number) => {
	// Remove record from watch_later table
	await db.deleteFrom("watch_later").where("song_id", "=", songID).execute();
};
