"use server";

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { cookies } from "next/headers";
import db from "./db";
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

export const fetchLikedSongIDs = async (userID: string) => {
	return (
		await db
			.selectFrom("liked_songs")
			.where("user_id", "=", userID)
			.select("song_id")
			.execute()
	).map((song) => song.song_id);
};

export const setAudioBarCookies = async (
	id: number,
	name: string,
	artist: string,
	album: string,
	year: number,
	albumArt: string,
	audio: string,
	isLiked: boolean
) => {
	(await cookies()).set("currentSongID", id.toString());
	(await cookies()).set("currentSongName", name);
	(await cookies()).set("currentArtist", artist);
	(await cookies()).set("currentAlbum", album);
	(await cookies()).set("currentYear", year.toString());
	(await cookies()).set("currentAlbumArt", albumArt);
	(await cookies()).set("currentAudioSrc", audio);
	(await cookies()).set("isCurrentlyLiked", isLiked ? "true" : "false");
};
