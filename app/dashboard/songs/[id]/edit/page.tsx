import { editSong } from "@/actions/admin/song-actions";
import BackLink from "@/components/dashboard/back-link";
import SongForm from "@/components/dashboard/song-form";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const SongEditPage = async ({
	params,
}: {
	params: Promise<{ id: number }>;
}) => {
	const id = (await params).id;
	const song = await db
		.selectFrom("songs")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();
	const albums = await db.selectFrom("albums").selectAll().execute();

	if (!song) {
		redirect("/dashboard/songs");
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<BackLink target="songs" />
			<BackLink target={`songs/${song.id}`} name={song.name} />
			<SongForm
				title="Edit Song"
				song={JSON.parse(JSON.stringify(song))}
				albums={albums.map((album) => ({
					id: album.id!,
					name: album.name,
				}))}
				action={editSong}
			/>
		</div>
	);
};

export default SongEditPage;
