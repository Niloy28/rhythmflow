import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import Link from "next/link";
import React from "react";

const AlbumsPage = async () => {
	const albums = await db.selectFrom("albums").selectAll().execute();

	return (
		<Card className="m-6 p-2 flex flex-col">
			<CardHeader>
				<CardTitle>Albums</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col justify-start items-start">
				<Button className="p-2 m-2">
					<Link href="/dashboard/albums/create">Create New</Link>
				</Button>

				<div className="m-2 p-4 flex flex-col">
					<ul className="list-disc">
						{albums.map((album) => (
							<li key={album.id} className="list-item">
								<Link
									className="hover:cursor-pointer text-blue-500"
									href={`/dashboard/albums/${album.id}`}
								>
									{album.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
};

export default AlbumsPage;
