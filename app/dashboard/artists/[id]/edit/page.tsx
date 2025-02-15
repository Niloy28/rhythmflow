import { editArtist } from "@/actions/admin/artist-actions";
import ArtistForm from "@/components/dashboard/artist-form";
import BackLink from "@/components/dashboard/back-link";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const ArtistEditPage = async ({
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
		<div className="flex flex-col items-center justify-center">
			<BackLink target="artists" />
			<BackLink target={`artists/${artist.id}`} name={artist.name} />
			<ArtistForm
				title="Create New Artist"
				artist={{
					id: artist.id,
					name: artist.name,
					image_src: artist.image_src,
				}}
				action={editArtist}
			/>
		</div>
	);
};

export default ArtistEditPage;
