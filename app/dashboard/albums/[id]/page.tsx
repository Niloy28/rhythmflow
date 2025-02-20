import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const AlbumDetailsPage = async ({
	params,
}: {
	params: Promise<{ id: number }>;
}) => {
	const id = (await params).id;
	const album = await db
		.selectFrom("albums")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	if (!album) {
		redirect("/dashboard/albums");
	}

	const artist = await db
		.selectFrom("artists")
		.select("name")
		.select("image_src")
		.where("id", "=", album.artist_id)
		.executeTakeFirst();

	return (
		<Card className="m-6 p-2 flex flex-col min-w-96">
			<CardHeader>
				<CardTitle>{album.name}</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-center gap-8 items-center">
				<Image
					className="rounded-lg"
					src={album.image_src}
					alt={album.name}
					width={600}
					height={600}
				/>
				<div>
					<p>
						<Link
							className="flex gap-2 hover:cursor-pointer underline underline-offset-1"
							href={`/dashboard/artists/${album.artist_id}`}
						>
							Artist: {artist!.name} <ArrowUpRightIcon />
						</Link>{" "}
					</p>
					<p>Year: {album.year}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default AlbumDetailsPage;
