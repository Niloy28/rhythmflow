import React from "react";
import db from "@/lib/db";
import { shuffleArray } from "@/lib/utils";
import SongList from "./song-list";
import { cookies } from "next/headers";

const LibraryView = async () => {
	let songs = await db
		.selectFrom("songs")
		.innerJoin("albums", "songs.album_id", "albums.id")
		.select(["songs.name", "songs.audio", "albums.image_src as album_art"])
		.execute();
	let albums = await db.selectFrom("albums").selectAll().execute();
	let artists = await db.selectFrom("artists").selectAll().execute();

	shuffleArray(songs);
	shuffleArray(albums);
	shuffleArray(artists);

	songs = songs.slice(0, 10);
	albums = albums.slice(0, 10);
	artists = artists.slice(0, 10);

	const setCookies = async (audio: string, albumArt: string) => {
		"use server";

		(await cookies()).set("currentlyListening", audio);
		(await cookies()).set("currentAlbumArt", albumArt);
	};

	return (
		<div className="w-full">
			<h2 className="text-3xl font-bold">Library</h2>
			<div className="flex gap-2 scroll-m-0 mt-2">
				<SongList
					songs={songs.map((song) => ({
						audio: song.audio,
						title: song.name,
						album_art: song.album_art,
					}))}
					setCookies={setCookies}
				/>
			</div>
		</div>
	);
};

export default LibraryView;
