import db from "@/lib/db";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import ArtistSongItem from "@/components/artist-song-item";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchLikedSongIDs } from "@/lib/server-utils";

/**
 * Artist detail page displaying artist information and all their songs
 *
 * @param params - Route parameters containing the artist ID
 * @returns JSX element displaying artist profile and complete discography
 *
 * @remarks
 * This page aggregates all songs by an artist across all their albums:
 * - Joins albums and songs tables to get complete track listings
 * - Includes album information for each song (name and artwork)
 * - Fetches user's liked songs to show like status for each track
 * - Displays artist profile image and name prominently
 *
 * The song table includes additional album column compared to album pages,
 * allowing users to see which album each song belongs to.
 *
 * Authentication is optional - anonymous users can browse but cannot like songs.
 */
const ArtistPage = async ({ params }: { params: Promise<{ id: number }> }) => {
	const id = (await params).id;

	// Fetch all songs by this artist across all albums
	const songs = await db
		.selectFrom("albums")
		.innerJoin("songs", "albums.id", "songs.album_id")
		.where("albums.artist_id", "=", id)
		.select([
			"songs.id",
			"songs.name",
			"songs.duration",
			"songs.audio",
			"songs.year",
			"albums.name as album",
			"albums.image_src as albumArt",
		])
		.execute();

	// Get artist profile information
	const artist = await db
		.selectFrom("artists")
		.where("id", "=", id)
		.selectAll()
		.executeTakeFirstOrThrow();

	// Fetch current user's liked songs for UI state
	const userID =
		(await auth.api.getSession({ headers: await headers() }))?.session.userId ??
		"";
	const likedSongIDs = await fetchLikedSongIDs(userID);

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center gap-4">
						<Image
							src={artist.image_src}
							alt={artist.name}
							width={96}
							height={96}
							className="rounded-md"
						/>
						<b className="text-2xl">{artist.name}</b>
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
							<TableHead className="text-center">Album</TableHead>
							<TableHead>Liked</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{songs.map((song, index) => (
							<ArtistSongItem
								className="hover:cursor-pointer"
								key={index}
								song={{
									...song,
									artist: artist.name,
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

export default ArtistPage;
