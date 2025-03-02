import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const LikedSongView = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-3xl font-bold">Liked Songs</CardTitle>
			</CardHeader>
			<CardContent>
				{!session && <p>Sign in to see your liked songs</p>}
				{session && <p>Fetching liked songs...</p>}
			</CardContent>
		</Card>
	);
};

export default LikedSongView;
