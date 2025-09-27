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

/**
 * Songs management dashboard page
 *
 * @returns JSX element displaying all songs with management options
 *
 * @remarks
 * This page serves as the central hub for song content administration:
 * - Lists all songs in the system as clickable management links
 * - Provides prominent "Create New" button for adding songs
 * - Each song name links to detailed management and preview page
 * - Uses consistent card-based layout matching other dashboard sections
 */
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
