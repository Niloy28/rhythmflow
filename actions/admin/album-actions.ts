"use server";

import { env } from "@/env/server";
import db from "@/lib/db";
import { uploadFileToBucket } from "@/lib/server-utils";
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
					image_src: `${env.R2_PUBLIC_URL}/${image.name}`,
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
