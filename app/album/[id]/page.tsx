import AlbumSongItem from "@/components/album-song-item";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
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
			"songs.year",
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
			"albums.artist_id",
			"artists.name as artist",
			"artists.image_src as artist_image",
		])
		.executeTakeFirst();

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
										src={album.artist_image}
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
						</TableRow>
					</TableHeader>
					<TableBody>
						{songs.map((song, index) => (
							<AlbumSongItem
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

export default AlbumPage;
