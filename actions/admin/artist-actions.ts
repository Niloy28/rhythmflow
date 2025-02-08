"use server";

import { env } from "@/env/server";
import s3 from "@/lib/s3";
import { computeSHA256 } from "@/lib/utils";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export const createArtist = async (formData: FormData) => {
	const image = formData.get("image") as File;

	if (!image) {
		throw new Error("No image provided");
	}

	const url = await createPresignedUrlForUpload(
		image.name,
		image.type,
		image.size,
		await computeSHA256(image)
	);

	await fetch(url, {
		method: "PUT",
		body: image,
		headers: {
			"Content-Type": image.type,
		},
	});
};
