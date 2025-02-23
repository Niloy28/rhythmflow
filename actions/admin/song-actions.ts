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

	const image = formData.get("image") as File;

	if (!image) {
		throw new Error("No image provided");
	}

	if (image.size > env.IMAGE_MAX_SIZE) {
		throw new Error("Image is too large");
	}

	const album_id = parseInt(formData.get("album_id") as string);

	if (!album_id) {
		throw new Error("No album provided");
	}

	const year = parseInt(formData.get("year") as string);

	if (!year) {
		throw new Error("No year provided");
	}

	return { name, image, album_id, year };
};

export const createSong = async (formData: FormData) => {
	const { name, image, album_id, year } = validateFormData(formData);

	const response = await uploadFileToBucket(image, env.SONG_BUCKET_NAME);

	if (response.ok) {
		try {
			db.insertInto("songs")
				.values({
					name,
					year,
					image_src: `${env.R2_PUBLIC_URL}/${image.name}`,
					album_id,
				})
				.executeTakeFirstOrThrow();
		} catch (e) {
			console.error(e);
		}
	} else {
		console.error("Failed to upload image");
	}

	revalidatePath("/dashboard/songs");
	redirect("/dashboard/songs");
};

export const editSong = async (formData: FormData) => {
	const { name, image, album_id, year } = validateFormData(formData);

	const id = parseInt(formData.get("id") as string);
	const oldImageSrc = formData.get("old_image_src") as string;

	// Delete the old image from bucket
	await deleteFileFromBucket(
		oldImageSrc.split("/").pop()!,
		env.SONG_BUCKET_NAME
	);

	// Upload the new image
	const response = await uploadFileToBucket(image, env.SONG_BUCKET_NAME);

	if (response.ok) {
		try {
			db.updateTable("songs")
				.set({
					name,
					year,
					album_id,
					image_src: `${env.R2_PUBLIC_URL}/${image.name}`,
				})
				.where("id", "=", id)
				.executeTakeFirstOrThrow();
		} catch (e) {
			console.error(e);
		}
	} else {
		console.error("Failed to upload image");
	}

	revalidatePath(`/dashboard/songs/${id}`);
	redirect(`/dashboard/songs/${id}`);
};

export const deleteSong = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const imageSrc = formData.get("image_src") as string;

	await deleteFileFromBucket(imageSrc.split("/").pop()!, env.SONG_BUCKET_NAME);
	await db.deleteFrom("songs").where("id", "=", parseInt(id)).execute();

	revalidatePath("/dashboard/songs");
	redirect("/dashboard/songs");
};
