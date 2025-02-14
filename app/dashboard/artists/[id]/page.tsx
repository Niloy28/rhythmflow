import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ArtistDetailsPage = async ({
	params,
}: {
	params: Promise<{ id: number }>;
}) => {
	const id = (await params).id;
	const artist = await db
		.selectFrom("artists")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	if (!artist) {
		redirect("/dashboard/artists");
	}

	return (
		<Card className="m-6 p-2 flex flex-col min-w-96">
			<CardHeader>
				<CardTitle>{artist.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<Image
					src={artist.image_src}
					alt={artist.name}
					width={600}
					height={600}
				/>
			</CardContent>
			<CardFooter>
				<Link
					className="flex gap-2 hover:cursor-pointer underline underline-offset-1"
					href="/dashboard/artists"
				>
					<ArrowLeft /> <p>Back to artists</p>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default ArtistDetailsPage;
