"use server";

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { cookies } from "next/headers";
import db from "./db";
import s3 from "./s3";
import { computeSHA256 } from "./utils";

/**
 * Creates a presigned URL for secure file upload to R2 bucket
 *
 * @param fileName - Name of the file to upload
 * @param fileType - MIME type of the file
 * @param fileSize - Size of the file in bytes
 * @param checksum - SHA256 checksum for integrity verification
 * @param bucketName - Target R2 bucket name
 * @returns Promise resolving to a presigned upload URL
 *
 * @remarks
 * The presigned URL expires in 120 seconds and includes checksum validation
 * for secure, direct client-to-storage uploads.
 */
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

/**
 * Uploads a file to the specified R2 bucket
 *
 * @param file - File object to upload
 * @param bucketName - Target R2 bucket name
 * @returns Promise resolving to the fetch Response object
 *
 * @remarks
 * Creates a presigned URL and performs the actual upload with proper
 * content type headers and SHA256 checksum validation.
 */
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

/**
 * Deletes a file from the specified R2 bucket
 *
 * @param fileName - Name of the file to delete
 * @param bucketName - Source R2 bucket name
 * @returns Promise that resolves when deletion is complete
 *
 * @remarks
 * Used for cleanup operations when updating or removing media files.
 */
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

/**
 * Fetches all song IDs that a user has liked
 *
 * @param userID - The user's unique identifier
 * @returns Promise resolving to an array of liked song IDs
 *
 * @remarks
 * Used for determining which songs to display as "liked" in the UI
 * and for playlist management operations.
 */
export const fetchLikedSongIDs = async (userID: string) => {
	return (
		await db
			.selectFrom("liked_songs")
			.where("user_id", "=", userID)
			.select("song_id")
			.execute()
	).map((song) => song.song_id);
};

/**
 * Sets all audio player state cookies for the current song
 *
 * @param id - Song ID
 * @param name - Song name
 * @param artist - Artist name
 * @param album - Album name
 * @param year - Release year
 * @param albumArt - Album artwork URL
 * @param audio - Audio file URL
 * @param isLiked - Whether the song is liked by current user
 * @returns Promise that resolves when all cookies are set
 *
 * @remarks
 * Maintains audio player state across page navigation and browser sessions.
 * Used by the persistent audio player component.
 */
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
	await setLikedSongCookie(isLiked);
};

/**
 * Updates the liked status cookie for the current song
 *
 * @param isLiked - Whether the current song is liked
 * @returns Promise that resolves when cookie is updated
 *
 * @remarks
 * Used when users like/unlike songs to maintain UI state consistency
 * without requiring full page refresh.
 */
export const setLikedSongCookie = async (isLiked: boolean) => {
	(await cookies()).set("isCurrentlyLiked", isLiked ? "true" : "false");
};
