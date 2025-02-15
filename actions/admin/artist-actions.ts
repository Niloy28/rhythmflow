"use server";

import { env } from "@/env/server";
import db from "@/lib/db";
import s3 from "@/lib/s3";
import { computeSHA256 } from "@/lib/utils";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createPresignedUrlForUpload = async (
	fileName: string,
	fileType: string,
	fileSize: number,
	checksum: string
) => {
	const command = new PutObjectCommand({
		Bucket: env.BUCKET_NAME,
		Key: fileName,
		ContentType: fileType,
		ContentLength: fileSize,
		ChecksumSHA256: checksum,
	});

	return await getSignedUrl(s3, command, { expiresIn: 120 });
};

const uploadImageToBucket = async (image: File) => {
	const url = await createPresignedUrlForUpload(
		image.name,
		image.type,
		image.size,
		await computeSHA256(image)
	);

	return await fetch(url, {
		method: "PUT",
		body: image,
		headers: {
			"Content-Type": image.type,
		},
	});
};

const deleteImageFromBucket = async (fileName: string) => {
	const command = new DeleteObjectCommand({
		Bucket: env.BUCKET_NAME,
		Key: fileName,
	});

	await s3.send(command);
};

export const createArtist = async (formData: FormData) => {
	const image = formData.get("image") as File;

	if (!image) {
		throw new Error("No image provided");
	}

	const response = await uploadImageToBucket(image);

	if (response.ok) {
		try {
			db.insertInto("artists")
				.values({
					name: formData.get("name") as string,
					image_src: `${env.R2_PUBLIC_URL}/${image.name}`,
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
	const image = formData.get("image") as File;
	const id = parseInt(formData.get("id") as string);
	const oldImageSrc = formData.get("old_image_src") as string;

	if (!image) {
		throw new Error("No image provided");
	}

	// Delete the old image from bucket
	await deleteImageFromBucket(oldImageSrc.split("/").pop()!);

	// Upload the new image
	const response = await uploadImageToBucket(image);

	if (response.ok) {
		try {
			db.updateTable("artists")
				.set({
					name: formData.get("name") as string,
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

	revalidatePath(`/dashboard/artists/${id}`);
	redirect(`/dashboard/artists/${id}`);
};

export const deleteArtist = async (formData: FormData) => {
	const id = formData.get("id") as string;
	const imageSrc = formData.get("image_src") as string;

	await deleteImageFromBucket(imageSrc.split("/").pop()!);
	await db.deleteFrom("artists").where("id", "=", parseInt(id)).execute();

	revalidatePath("/dashboard/artists");
	redirect("/dashboard/artists");
};
