import BackLink from "@/components/dashboard/back-link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SongDetailsPage = async ({
	params,
}: {
	params: Promise<{ id: number }>;
}) => {
	const id = (await params).id;
	const song = await db
		.selectFrom("songs")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	if (!song) {
		redirect("/dashboard/songs");
	}

	const album = await db
		.selectFrom("albums")
		.selectAll()
		.where("id", "=", song.album_id)
		.executeTakeFirstOrThrow();

	const artist = await db
		.selectFrom("artists")
		.select("id")
		.select("name")
		.select("image_src")
		.where("id", "=", album.artist_id)
		.executeTakeFirstOrThrow();

	return (
		<Card className="m-6 p-2 flex flex-col min-w-96">
			<CardHeader>
				<CardTitle>{song.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-left gap-8 items-center">
					<audio controls src={song.audio} />
					<div>
						<div>
							<p>Song Release Year: {song.year}</p>
							<Link
								className="flex gap-2 hover:cursor-pointer underline underline-offset-1"
								href={`/dashboard/albums/${album.id}`}
							>
								Album: {album!.name} <ArrowUpRightIcon />
							</Link>{" "}
						</div>
						<p>Album Release Year: {album.year}</p>
					</div>
					<div className="ml-auto">
						<div className="flex gap-4 justify-center items-center">
							<Link
								className="flex gap-2 hover:cursor-pointer underline underline-offset-1"
								href={`/dashboard/artists/${artist.id}`}
							>
								Artist: {artist!.name} <ArrowUpRightIcon />
							</Link>
							<Image
								src={artist.image_src}
								height={200}
								width={200}
								alt={artist.name}
							/>
						</div>
					</div>
				</div>
				<div className="flex gap-2 p-2 mt-2">
					<Link href={`/dashboard/songs/${id}/edit`}>
						<Button>Edit</Button>
					</Link>
					<Link href={`/dashboard/songs/${id}/delete`}>
						<Button variant="destructive">Delete</Button>
					</Link>
				</div>
			</CardContent>
			<CardFooter>
				<BackLink target="songs" />
			</CardFooter>
		</Card>
	);
};

export default SongDetailsPage;
