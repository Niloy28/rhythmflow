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

export const createAlbum = async (formData: FormData) => {
	const { name, image, artist_id, year } = validateFormData(formData);

	const response = await uploadFileToBucket(image, env.ALBUM_BUCKET_NAME);

	if (response.ok) {
		try {
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

	revalidatePath("/dashboard/albums");
	redirect("/dashboard/albums");
};

export const editAlbum = async (formData: FormData) => {
	const { name, image, artist_id, year } = validateFormData(formData);

	const id = parseInt(formData.get("id") as string);
	const oldImageSrc = formData.get("old_image_src") as string;

	// Delete the old image from bucket
	await deleteFileFromBucket(
		oldImageSrc.split("/").pop()!,
		env.ALBUM_BUCKET_NAME
	);

	// Upload the new image
	const response = await uploadFileToBucket(image, env.ALBUM_BUCKET_NAME);

	if (response.ok) {
		try {
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

	revalidatePath(`/dashboard/albums/${id}`);
	redirect(`/dashboard/albums/${id}`);
};

export const deleteAlbum = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const imageSrc = formData.get("image_src") as string;

	await deleteFileFromBucket(imageSrc.split("/").pop()!, env.ALBUM_BUCKET_NAME);
	await db.deleteFrom("albums").where("id", "=", parseInt(id)).execute();

	revalidatePath("/dashboard/albums");
	redirect("/dashboard/albums");
};
