import { createSong } from "@/actions/admin/song-actions";
import BackLink from "@/components/dashboard/back-link";
import SongForm from "@/components/dashboard/song-form";
import db from "@/lib/db";
import React from "react";

const SongCreatePage = async () => {
	const albums = await db.selectFrom("albums").selectAll().execute();

	return (
		<div className="flex flex-col items-center justify-center">
			<BackLink target="songs" />
			<SongForm
				title="Create New Song"
				action={createSong}
				albums={albums.map((album) => ({
					id: album.id!,
					name: album.name,
				}))}
			/>
		</div>
	);
};

export default SongCreatePage;
