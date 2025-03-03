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

const ArtistPage = async ({ params }: { params: Promise<{ id: number }> }) => {
	const id = (await params).id;
	const songs = await db
		.selectFrom("albums")
		.innerJoin("songs", "albums.id", "songs.album_id")
		.where("albums.artist_id", "=", id)
		.select([
			"songs.name",
			"songs.duration",
			"songs.audio",
			"songs.year",
			"albums.name as album",
			"albums.image_src as album_art",
		])
		.execute();
	const artist = await db
		.selectFrom("artists")
		.where("id", "=", id)
		.selectAll()
		.executeTakeFirstOrThrow();

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
						</TableRow>
					</TableHeader>
					<TableBody>
						{songs.map((song, index) => (
							<ArtistSongItem
								className="hover:cursor-pointer"
								key={index}
								song={JSON.parse(JSON.stringify(song))}
							/>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default ArtistPage;
