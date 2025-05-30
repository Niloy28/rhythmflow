import SongTile from "@/components/tiles/song-tile";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers } from "next/headers";
import React from "react";

const LikedSongsPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const songs = await db
		.selectFrom("liked_songs")
		.where("user_id", "==", session!.session.userId!)
		.innerJoin("songs", "liked_songs.song_id", "songs.id")
		.innerJoin("albums", "songs.album_id", "albums.id")
		.innerJoin("artists", "albums.artist_id", "artists.id")
		.select([
			"songs.id",
			"songs.name",
			"artists.name as artist",
			"albums.name as album",
			"albums.image_src as albumArt",
			"songs.audio",
			"songs.year",
		])
		.execute();

	return (
		<div className="bg-gray-800 min-h-screen p-4">
			<h1 className="text-white text-2xl font-bold mb-4">Liked Songs</h1>
			<ul className="space-y-4">
				{songs.map((song, index) => (
					<SongTile key={index} song={{ ...song, liked: true }} />
				))}
			</ul>
		</div>
	);
};

export default LikedSongsPage;
