"use server";

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { cookies } from "next/headers";
import s3 from "./s3";
import { computeSHA256 } from "./utils";

export const createPresignedUrlForUpload = async (
	fileName: string,
	fileType: string,
	fileSize: number,
	checksum: string,
	bucketName: string
) => {
	const command = new PutObjectCommand({
		Bucket: bucketName,
		Key: fileName,
		ContentType: fileType,
		ContentLength: fileSize,
		ChecksumSHA256: checksum,
	});

	return await getSignedUrl(s3, command, { expiresIn: 120 });
};

export const uploadFileToBucket = async (file: File, bucketName: string) => {
	const url = await createPresignedUrlForUpload(
		file.name,
		file.type,
		file.size,
		await computeSHA256(file),
		bucketName
	);

	return await fetch(url, {
		method: "PUT",
		body: file,
		headers: {
			"Content-Type": file.type,
		},
	});
};

export const deleteFileFromBucket = async (
	fileName: string,
	bucketName: string
) => {
	const command = new DeleteObjectCommand({
		Bucket: bucketName,
		Key: fileName,
	});

	await s3.send(command);
};

export const setAudioBarCookies = async (audio: string, albumArt: string) => {
	(await cookies()).set("currentlyListening", audio);
	(await cookies()).set("currentAlbumArt", albumArt);
};
