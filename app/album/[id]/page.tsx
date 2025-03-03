import AlbumSongItem from "@/components/album-song-item";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import Image from "next/image";
import React from "react";

const AlbumPage = async ({ params }: { params: Promise<{ id: number }> }) => {
	const id = (await params).id;
	const songs = await db
		.selectFrom("songs")
		.where("songs.album_id", "=", id)
		.innerJoin("albums", "songs.album_id", "albums.id")
		.select([
			"songs.name",
			"songs.duration",
			"songs.audio",
			"albums.image_src as album_art",
		])
		.execute();
	const album = await db
		.selectFrom("albums")
		.where("albums.id", "=", id)
		.innerJoin("artists", "albums.artist_id", "artists.id")
		.select([
			"albums.name",
			"albums.year",
			"albums.image_src",
			"artists.name as artist",
		])
		.executeTakeFirst();

	if (!album) {
		throw new Error("Album not found");
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center gap-4">
						<Image
							src={album.image_src}
							alt={album.name}
							width={96}
							height={96}
							className="rounded-md"
						/>
						<b className="text-2xl">{album.name}</b>
					</div>
					<div className="flex flex-col gap-2 font-semibold">
						<p>{album.year}</p>
						<p>{album.artist}</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="py-4">
				<Separator />

				<div className="flex flex-col">
					{songs.map((song, index) => (
						<>
							<AlbumSongItem
								className="hover:cursor-pointer"
								key={index}
								song={JSON.parse(JSON.stringify(song))}
							/>
							{index < songs.length - 1 && <Separator />}
						</>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default AlbumPage;
