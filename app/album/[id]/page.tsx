import AlbumSongItem from "@/components/album-song-item";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { fetchLikedSongIDs } from "@/lib/server-utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Album detail page displaying album information and associated songs
 *
 * @param params - Route parameters containing the album ID
 * @returns JSX element displaying album details and song list
 *
 * @remarks
 * This page performs several database queries to gather complete album information:
 * - Fetches all songs associated with the album including artist information
 * - Retrieves album metadata and associated artist details
 * - Gets the current user's liked songs to display like status
 *
 * The page displays:
 * - Album artwork and metadata (name, year, artist with profile image)
 * - Clickable artist link leading to artist page
 * - Table of all songs in the album with playback and like functionality
 *
 * Authentication is optional - if no user is logged in, like functionality is disabled.
 *
 * @throws Error if the album with the specified ID is not found
 */
const AlbumPage = async ({ params }: { params: Promise<{ id: number }> }) => {
	const id = (await params).id;

	// Fetch all songs in the album with artist information
	const songs = await db
		.selectFrom("songs")
		.where("songs.album_id", "=", id)
		.innerJoin("albums", "songs.album_id", "albums.id")
		.innerJoin("artists", "albums.artist_id", "artists.id")
		.select([
			"songs.id",
			"songs.name",
			"songs.duration",
			"songs.audio",
			"songs.year",
			"artists.name as artist",
		])
		.execute();

	// Fetch album details with artist information
	const album = await db
		.selectFrom("albums")
		.where("albums.id", "=", id)
		.innerJoin("artists", "albums.artist_id", "artists.id")
		.select([
			"albums.name",
			"albums.year",
			"albums.image_src",
			"albums.artist_id",
			"artists.name as artist",
			"artists.image_src as artistImage",
		])
		.executeTakeFirst();

	// Get current user's liked songs for like status display
	const userID =
		(await auth.api.getSession({ headers: await headers() }))?.session.userId ??
		"";
	const likedSongIDs = await fetchLikedSongIDs(userID);

	if (!album) {
		throw new Error("Album not found");
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex gap-4 items-center mb-8">
					<div className="relative flex items-center gap-4">
						<Image
							src={album.image_src}
							alt={album.name}
							width={112}
							height={112}
							className="rounded-md"
						/>
					</div>
					<div className="flex flex-col gap-2 font-semibold">
						<b className="text-2xl">{album.name}</b>
						<div className="font-normal text-gray-500 tracking-tighter leading-4">
							<p>{album.year}</p>
							<Link
								href={`/artist/${album.artist_id}`}
								className="hover:cursor-pointer"
							>
								<p className="flex justify-start items-center gap-2">
									{album.artist}{" "}
									<Image
										src={album.artistImage}
										alt={album.artist}
										width={24}
										height={24}
										className="rounded-full"
									/>
								</p>
							</Link>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent className="py-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Release Year</TableHead>
							<TableHead>Duration</TableHead>
							<TableHead>Liked</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{songs.map((song, index) => (
							<AlbumSongItem
								className="hover:cursor-pointer"
								key={index}
								song={{
									...song,
									album: album.name,
									albumArt: album.image_src,
									liked: likedSongIDs.includes(song.id!),
								}}
							/>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default AlbumPage;
