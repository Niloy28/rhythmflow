import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import db from "@/lib/db";
import SongTile from "../tiles/song-tile";

const LikedSongView = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	let innerNode: React.ReactNode;

	if (!session || !session.user) {
		innerNode = (
			<p>
				<Link
					href="/signin"
					className="text-blue-400 underline underline-offset-1"
				>
					Sign in
				</Link>{" "}
				to see your liked songs
			</p>
		);
	} else if (session && session.user) {
		const likedSongs = await db
			.selectFrom("liked_songs")
			.where("user_id", "=", session.user.id)
			.innerJoin("songs", "liked_songs.song_id", "songs.id")
			.innerJoin("albums", "songs.album_id", "albums.id")
			.innerJoin("artists", "albums.artist_id", "artists.id")
			.select([
				"songs.name",
				"songs.year",
				"songs.audio",
				"albums.image_src as image_src",
				"artists.name as artist",
			])
			.execute();

		innerNode = (
			<>
				{likedSongs.map((song, index) => (
					<SongTile
						key={index}
						title={song.name}
						year={song.year}
						image={song.image_src}
						artist={song.artist}
						audio={song.audio}
						liked
					/>
				))}
				{likedSongs.length === 0 && (
					<>
						<p>Like some songs to make them show up here.</p>
					</>
				)}
			</>
		);
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-3xl font-bold">Liked Songs</CardTitle>
			</CardHeader>
			<CardContent>{innerNode}</CardContent>
		</Card>
	);
};

export default LikedSongView;
