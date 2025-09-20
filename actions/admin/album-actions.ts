"use server";

import { env } from "@/env/server";
import db from "@/lib/db";
import { deleteFileFromBucket, uploadFileToBucket } from "@/lib/server-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Validates form data for album operations
 * @param formData - FormData object containing album information
 * @returns Validated album data object
 * @throws Error if any required field is missing or invalid
 */
const validateFormData = (formData: FormData) => {
	const name = formData.get("name") as string;

	if (!name) {
		throw new Error("No name provided");
	}

	const image = formData.get("image") as File;

	if (!image) {
		throw new Error("No image provided");
	}

	// Check if image exceeds maximum allowed size
	if (image.size > env.IMAGE_MAX_SIZE) {
		throw new Error("Image is too large");
	}

	const artist_id = parseInt(formData.get("artist_id") as string);

	if (!artist_id) {
		throw new Error("No artist provided");
	}

	const year = parseInt(formData.get("year") as string);

	if (!year) {
		throw new Error("No year provided");
	}

	return { name, image, artist_id, year };
};

/**
 * Creates a new album in the database
 * Uploads album cover image to R2 bucket and stores album metadata
 * @param formData - FormData containing album details (name, image, artist_id, year)
 */
export const createAlbum = async (formData: FormData) => {
	const { name, image, artist_id, year } = validateFormData(formData);

	// Upload album cover image to R2 bucket
	const response = await uploadFileToBucket(image, env.ALBUM_BUCKET_NAME);

	if (response.ok) {
		try {
			// Insert album record into database
			db.insertInto("albums")
				.values({
					name,
					year,
					image_src: `${env.R2_PUBLIC_ALBUM_URL}/${image.name}`,
					artist_id,
				})
				.executeTakeFirstOrThrow();
		} catch (e) {
			console.error(e);
		}
	} else {
		console.error("Failed to upload image");
	}

	// Revalidate cache and redirect to albums dashboard
	revalidatePath("/dashboard/albums");
	redirect("/dashboard/albums");
};

/**
 * Updates an existing album in the database
 * Replaces old album cover with new one and updates album metadata
 * @param formData - FormData containing updated album details and existing album ID
 */
export const editAlbum = async (formData: FormData) => {
	const { name, image, artist_id, year } = validateFormData(formData);

	const id = parseInt(formData.get("id") as string);
	const oldImage = formData.get("old_image") as string;

	// Remove old image from R2 bucket before uploading new one
	await deleteFileFromBucket(oldImage.split("/").pop()!, env.ALBUM_BUCKET_NAME);

	// Upload the new album cover image
	const response = await uploadFileToBucket(image, env.ALBUM_BUCKET_NAME);

	if (response.ok) {
		try {
			// Update album record in database
			db.updateTable("albums")
				.set({
					name,
					year,
					artist_id,
					image_src: `${env.R2_PUBLIC_ALBUM_URL}/${image.name}`,
				})
				.where("id", "=", id)
				.executeTakeFirstOrThrow();
		} catch (e) {
			console.error(e);
		}
	} else {
		console.error("Failed to upload image");
	}

	// Revalidate cache and redirect to specific album page
	revalidatePath(`/dashboard/albums/${id}`);
	redirect(`/dashboard/albums/${id}`);
};

/**
 * Deletes an album from the database and removes associated files
 * @param formData - FormData containing album ID and image source URL
 */
export const deleteAlbum = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const imageSrc = formData.get("image_src") as string;

	// Delete album cover image from R2 bucket
	await deleteFileFromBucket(imageSrc.split("/").pop()!, env.ALBUM_BUCKET_NAME);

	// Remove album record from database
	await db.deleteFrom("albums").where("id", "=", parseInt(id)).execute();

	// Revalidate cache and redirect to albums dashboard
	revalidatePath("/dashboard/albums");
	redirect("/dashboard/albums");
};
