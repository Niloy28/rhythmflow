"use server";

import { env } from "@/env/server";
import db from "@/lib/db";
import { deleteFileFromBucket, uploadFileToBucket } from "@/lib/server-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Validates form data for song operations
 * @param formData - FormData object containing song information
 * @returns Validated song data object with rounded duration
 * @throws Error if any required field is missing or invalid
 */
const validateFormData = (formData: FormData) => {
	const name = formData.get("name") as string;

	if (!name) {
		throw new Error("No name provided");
	}

	const song = formData.get("audio") as File;

	if (!song) {
		throw new Error("No song provided");
	}

	// Validate audio file size against environment limit
	if (song.size > env.SONG_MAX_SIZE) {
		throw new Error("Song is too large");
	}

	// Convert duration to integer (assuming it comes as float)
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

/**
 * Creates a new song in the database
 * Uploads audio file to R2 bucket and stores song metadata
 * @param formData - FormData containing song details (name, audio, album_id, year, duration)
 */
export const createSong = async (formData: FormData) => {
	const { name, song, album_id, year, duration } = validateFormData(formData);

	// Upload audio file to dedicated songs R2 bucket
	const response = await uploadFileToBucket(song, env.SONG_BUCKET_NAME);

	if (response.ok) {
		try {
			// Insert song record into database
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

	// Refresh cache and navigate to songs dashboard
	revalidatePath("/dashboard/songs");
	redirect("/dashboard/songs");
};

/**
 * Updates an existing song in the database
 * Replaces old audio file with new one and updates song metadata
 * @param formData - FormData containing updated song details and existing song ID
 */
export const editSong = async (formData: FormData) => {
	const { name, song, album_id, year, duration } = validateFormData(formData);

	const id = parseInt(formData.get("id") as string);
	const oldSong = formData.get("old_audio") as string;

	// Remove old audio file from R2 bucket
	await deleteFileFromBucket(oldSong.split("/").pop()!, env.SONG_BUCKET_NAME);

	// Upload new audio file
	const response = await uploadFileToBucket(song, env.SONG_BUCKET_NAME);

	if (response.ok) {
		try {
			// Update song record with new information
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

	// Refresh cache and navigate to specific song page
	revalidatePath(`/dashboard/songs/${id}`);
	redirect(`/dashboard/songs/${id}`);
};

/**
 * Deletes a song from the database and removes associated audio file
 * @param formData - FormData containing song ID and audio source URL
 */
export const deleteSong = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const audio = formData.get("audio") as string;

	// Remove audio file from R2 bucket
	await deleteFileFromBucket(audio.split("/").pop()!, env.SONG_BUCKET_NAME);

	// Delete song record from database
	await db.deleteFrom("songs").where("id", "=", parseInt(id)).execute();

	// Refresh cache and navigate back to songs dashboard
	revalidatePath("/dashboard/songs");
	redirect("/dashboard/songs");
};
