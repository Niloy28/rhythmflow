import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import Link from "next/link";
import React from "react";

const ArtistsPage = async () => {
	const artists = await db.selectFrom("artists").selectAll().execute();

	return (
		<Card className="m-6 p-2 flex flex-col">
			<CardHeader>
				<CardTitle>Artists</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col justify-start items-start">
				<Button className="p-2 m-2">
					<Link href="/dashboard/artists/create">Create New</Link>
				</Button>

				<div className="m-2 p-4 flex flex-col">
					<ul className="list-disc">
						{artists.map((artist) => (
							<li key={artist.id} className="list-item">
								<Link
									className="hover:cursor-pointer text-blue-500"
									href={`/dashboard/artists/${artist.id}`}
								>
									{artist.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
};

export default ArtistsPage;
