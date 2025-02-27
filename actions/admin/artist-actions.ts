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

	return { name, image };
};

export const createArtist = async (formData: FormData) => {
	const { name, image } = validateFormData(formData);

	const response = await uploadFileToBucket(image, env.ARTIST_BUCKET_NAME);

	if (response.ok) {
		try {
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

	revalidatePath("/dashboard/artists");
	redirect("/dashboard/artists");
};

export const editArtist = async (formData: FormData) => {
	const { name, image } = validateFormData(formData);

	const id = parseInt(formData.get("id") as string);
	const oldImageSrc = formData.get("old_image_src") as string;

	// Delete the old image from bucket
	await deleteFileFromBucket(
		oldImageSrc.split("/").pop()!,
		env.ARTIST_BUCKET_NAME
	);

	// Upload the new image
	const response = await uploadFileToBucket(image, env.ARTIST_BUCKET_NAME);

	if (response.ok) {
		try {
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

	revalidatePath(`/dashboard/artists/${id}`);
	redirect(`/dashboard/artists/${id}`);
};

export const deleteArtist = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const imageSrc = formData.get("image_src") as string;

	await deleteFileFromBucket(
		imageSrc.split("/").pop()!,
		env.ARTIST_BUCKET_NAME
	);
	await db.deleteFrom("artists").where("id", "=", parseInt(id)).execute();

	revalidatePath("/dashboard/artists");
	redirect("/dashboard/artists");
};
