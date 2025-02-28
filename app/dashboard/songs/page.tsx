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
import Link from "next/link";
import React from "react";

const SongsPage = async () => {
	const songs = await db.selectFrom("songs").selectAll().execute();

	return (
		<Card className="m-6 p-2 flex flex-col">
			<CardHeader>
				<CardTitle>Songs</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col justify-start items-start">
				<Button className="p-2 m-2">
					<Link href="/dashboard/songs/create">Create New</Link>
				</Button>

				<div className="m-2 p-4 flex flex-col">
					<ul className="list-disc">
						{songs.map((song) => (
							<li key={song.id} className="list-item">
								<Link
									className="hover:cursor-pointer text-blue-500"
									href={`/dashboard/songs/${song.id}`}
								>
									{song.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
			<CardFooter>
				<BackLink target="" name="dashboard" />
			</CardFooter>
		</Card>
	);
};

export default SongsPage;
