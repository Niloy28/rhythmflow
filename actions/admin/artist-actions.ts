"use server";

import { env } from "@/env/server";
import db from "@/lib/db";
import { deleteFileFromBucket, uploadFileToBucket } from "@/lib/server-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Validates form data for artist operations
 * @param formData - FormData object containing artist information
 * @returns Validated artist data object
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

	// Validate image size against environment limit
	if (image.size > env.IMAGE_MAX_SIZE) {
		throw new Error("Image is too large");
	}

	return { name, image };
};

/**
 * Creates a new artist in the database
 * Uploads artist profile image to R2 bucket and stores artist metadata
 * @param formData - FormData containing artist details (name, image)
 */
export const createArtist = async (formData: FormData) => {
	const { name, image } = validateFormData(formData);

	// Upload artist profile image to dedicated R2 bucket
	const response = await uploadFileToBucket(image, env.ARTIST_BUCKET_NAME);

	if (response.ok) {
		try {
			// Insert new artist record into database
			db.insertInto("artists")
				.values({
					name: name as string,
					image_src: `${env.R2_PUBLIC_ARTIST_URL}/${image.name}`,
				})
				.executeTakeFirstOrThrow();
		} catch (e) {
			console.error(e);
		}
	} else {
		console.error("Failed to upload image");
	}

	// Refresh cache and navigate to artists dashboard
	revalidatePath("/dashboard/artists");
	redirect("/dashboard/artists");
};

/**
 * Updates an existing artist in the database
 * Replaces old profile image with new one and updates artist metadata
 * @param formData - FormData containing updated artist details and existing artist ID
 */
export const editArtist = async (formData: FormData) => {
	const { name, image } = validateFormData(formData);

	const id = parseInt(formData.get("id") as string);
	const oldImage = formData.get("old_image") as string;

	// Clean up old profile image from R2 bucket
	await deleteFileFromBucket(
		oldImage.split("/").pop()!,
		env.ARTIST_BUCKET_NAME
	);

	// Upload new artist profile image
	const response = await uploadFileToBucket(image, env.ARTIST_BUCKET_NAME);

	if (response.ok) {
		try {
			// Update artist record with new information
			db.updateTable("artists")
				.set({
					name,
					image_src: `${env.R2_PUBLIC_ARTIST_URL}/${image.name}`,
				})
				.where("id", "=", id)
				.executeTakeFirstOrThrow();
		} catch (e) {
			console.error(e);
		}
	} else {
		console.error("Failed to upload image");
	}

	// Refresh cache and navigate to specific artist page
	revalidatePath(`/dashboard/artists/${id}`);
	redirect(`/dashboard/artists/${id}`);
};

/**
 * Deletes an artist from the database and removes associated files
 * @param formData - FormData containing artist ID and image source URL
 */
export const deleteArtist = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const imageSrc = formData.get("image_src") as string;

	// Remove artist profile image from R2 bucket
	await deleteFileFromBucket(
		imageSrc.split("/").pop()!,
		env.ARTIST_BUCKET_NAME
	);

	// Delete artist record from database
	await db.deleteFrom("artists").where("id", "=", parseInt(id)).execute();

	// Refresh cache and navigate back to artists dashboard
	revalidatePath("/dashboard/artists");
	redirect("/dashboard/artists");
};
