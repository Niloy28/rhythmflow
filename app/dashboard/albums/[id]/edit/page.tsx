import { editAlbum } from "@/actions/admin/album-actions";
import AlbumForm from "@/components/dashboard/album-form";
import BackLink from "@/components/dashboard/back-link";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const AlbumEditPage = async ({
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
	const artists = await db.selectFrom("artists").selectAll().execute();

	if (!album) {
		redirect("/dashboard/artists");
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<BackLink target="artists" />
			<BackLink target={`artists/${album.id}`} name={album.name} />
			<AlbumForm
				title="Edit Album"
				album={{
					id: album.id,
					name: album.name,
					year: album.year,
					artist_id: album.artist_id!,
					image_src: album.image_src,
				}}
				artists={artists.map((artist) => ({
					id: artist.id!,
					name: artist.name,
				}))}
				action={editAlbum}
			/>
		</div>
	);
};

export default AlbumEditPage;
