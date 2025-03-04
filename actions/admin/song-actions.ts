"use server";

import { env } from "@/env/server";
import db from "@/lib/db";
import { deleteFileFromBucket, uploadFileToBucket } from "@/lib/server-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const validateFormData = (formData: FormData) => {
	const name = formData.get("name") as string;

	if (!name) {
		throw new Error("No name provided");
	}

	const song = formData.get("audio") as File;

	if (!song) {
		throw new Error("No song provided");
	}

	if (song.size > env.SONG_MAX_SIZE) {
		throw new Error("Song is too large");
	}

	// Round duration to an integer
	const duration = Math.round(parseFloat(formData.get("duration") as string));

	const album_id = parseInt(formData.get("album_id") as string);

	if (!album_id) {
		throw new Error("No album provided");
	}

	const year = parseInt(formData.get("year") as string);

	if (!year) {
		throw new Error("No year provided");
	}

	return { name, song, album_id, year, duration };
};

export const createSong = async (formData: FormData) => {
	const { name, song, album_id, year, duration } = validateFormData(formData);

	const response = await uploadFileToBucket(song, env.SONG_BUCKET_NAME);

	if (response.ok) {
		try {
			db.insertInto("songs")
				.values({
					name,
					year,
					audio: `${env.R2_PUBLIC_SONG_URL}/${song.name}`,
					album_id,
					duration,
				})
				.executeTakeFirstOrThrow();
		} catch (e) {
			console.error(e);
		}
	} else {
		console.error("Failed to upload song");
	}

	revalidatePath("/dashboard/songs");
	redirect("/dashboard/songs");
};

export const editSong = async (formData: FormData) => {
	const { name, song, album_id, year, duration } = validateFormData(formData);

	const id = parseInt(formData.get("id") as string);
	const oldSong = formData.get("old_audio") as string;

	// Delete the old song from bucket
	await deleteFileFromBucket(oldSong.split("/").pop()!, env.SONG_BUCKET_NAME);

	// Upload the new song
	const response = await uploadFileToBucket(song, env.SONG_BUCKET_NAME);

	if (response.ok) {
		try {
			db.updateTable("songs")
				.set({
					name,
					year,
					album_id,
					audio: `${env.R2_PUBLIC_SONG_URL}/${song.name}`,
					duration,
				})
				.where("id", "=", id)
				.executeTakeFirstOrThrow();
		} catch (e) {
			console.error(e);
		}
	} else {
		console.error("Failed to upload song");
	}

	revalidatePath(`/dashboard/songs/${id}`);
	redirect(`/dashboard/songs/${id}`);
};

export const deleteSong = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const audio = formData.get("audio") as string;

	await deleteFileFromBucket(audio.split("/").pop()!, env.SONG_BUCKET_NAME);
	await db.deleteFrom("songs").where("id", "=", parseInt(id)).execute();

	revalidatePath("/dashboard/songs");
	redirect("/dashboard/songs");
};
