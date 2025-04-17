"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers } from "next/headers";

export const likeSong = async (formData: FormData) => {
	const songID = formData.get("song_id") as string;
	const userID = (await auth.api.getSession({ headers: await headers() }))!.user
		.id!;

	await db
		.insertInto("liked_songs")
		.values({
			song_id: parseInt(songID),
			user_id: userID,
		})
		.execute();
};

export const removeSongLike = async (formData: FormData) => {
	const songID = formData.get("song_id") as string;

	await db
		.deleteFrom("liked_songs")
		.where("song_id", "=", parseInt(songID))
		.execute();
};
