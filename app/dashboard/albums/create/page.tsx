import { createAlbum } from "@/actions/admin/album-actions";
import AlbumForm from "@/components/dashboard/album-form";
import BackLink from "@/components/dashboard/back-link";
import db from "@/lib/db";
import React from "react";

const AlbumCreatePage = async () => {
	const artists = await db.selectFrom("artists").selectAll().execute();

	return (
		<div className="flex flex-col items-center justify-center">
			<BackLink target="albums" />
			<AlbumForm
				title="Create New Album"
				action={createAlbum}
				artists={artists.map((artist) => ({
					id: artist.id!,
					name: artist.name,
				}))}
			/>
		</div>
	);
};

export default AlbumCreatePage;
