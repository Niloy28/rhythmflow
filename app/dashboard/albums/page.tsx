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
 * Albums management dashboard page
 *
 * @returns JSX element displaying all albums with management options
 *
 * @remarks
 * This page serves as the main albums administration interface:
 * - Lists all albums in the database as clickable links
 * - Provides a "Create New" button for adding albums
 * - Each album link navigates to the detailed album view
 * - Includes breadcrumb navigation back to main dashboard
 *
 * The page layout uses:
 * - Simple bullet-pointed list for easy scanning
 * - Blue colored links for clear visual hierarchy
 * - Card-based layout consistent with other dashboard pages
 *
 * This serves as the entry point for all album management operations
 * including viewing, editing, creating, and deleting albums.
 */
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
			<CardFooter>
				<BackLink target="" name="dashboard" />
			</CardFooter>
		</Card>
	);
};

export default AlbumsPage;
