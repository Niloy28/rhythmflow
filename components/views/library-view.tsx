import React from "react";
import db from "@/lib/db";
import { shuffleArray } from "@/lib/utils";
import SongList from "../lists/song-list";
import AlbumList from "../lists/album-list";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import ArtistList from "../lists/artist-list";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchLikedSongIDs } from "@/lib/server-utils";

const LibraryView = async () => {
	let songs = await db
		.selectFrom("songs")
		.innerJoin("albums", "songs.album_id", "albums.id")
		.innerJoin("artists", "albums.artist_id", "artists.id")
		.select([
			"songs.id",
			"songs.name",
			"songs.audio",
			"albums.image_src as album_art",
			"artists.name as artist",
			"songs.year",
		])
		.execute();
	let albums = await db
		.selectFrom("albums")
		.innerJoin("artists", "albums.artist_id", "artists.id")
		.select([
			"albums.id",
			"albums.name",
			"albums.year",
			"albums.image_src",
			"artists.name as artist",
		])
		.execute();
	let artists = await db
		.selectFrom("artists")
		.select(["id", "name", "image_src as image"])
		.execute();

	const userID =
		(await auth.api.getSession({ headers: await headers() }))?.user.id ?? "";
	const likedSongIDs = await fetchLikedSongIDs(userID);

	shuffleArray(songs);
	shuffleArray(albums);
	shuffleArray(artists);

	songs = songs.slice(0, 10);
	albums = albums.slice(0, 10);
	artists = artists.slice(0, 10);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-3xl font-bold">Library</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2 scroll-m-0 mt-2">
				<SongList
					songs={songs.map((song) => ({
						audio: song.audio,
						title: song.name,
						artist: song.artist,
						year: song.year,
						album_art: song.album_art,
						liked: likedSongIDs.includes(song.id!),
					}))}
				/>
				<Separator className="my-2" />
				<AlbumList
					albums={albums.map((album) => ({
						id: album.id!,
						title: album.name,
						artist: album.artist,
						year: album.year,
						image: album.image_src,
					}))}
				/>
				<Separator className="my-2" />
				<ArtistList artists={artists} />
			</CardContent>
		</Card>
	);
};

export default LibraryView;
