import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const ArtistsPage = () => {
	return (
		<Card className="m-6 p-2 flex flex-col">
			<CardHeader>
				<CardTitle>Artists</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center items-center">
					<Button className="p-2 m-2">
						<Link href="/dashboard/artists/create">Create</Link>
					</Button>
					<Button className="p-2 m-2">
						<Link href="/dashboard/artists/edit">Edit</Link>
					</Button>
					<Button className="p-2 m-2">
						<Link href="/dashboard/artists/delete">Delete</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ArtistsPage;
