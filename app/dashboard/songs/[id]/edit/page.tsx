import { editSong } from "@/actions/admin/song-actions";
import BackLink from "@/components/dashboard/back-link";
import SongForm from "@/components/dashboard/song-form";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Song editing page for dashboard administration
 *
 * @param params - Route parameters containing the song ID to edit
 * @returns JSX element with pre-filled song editing form
 *
 * @remarks
 * This page enables comprehensive editing of existing song records:
 * - Pre-populates form with current song data including metadata
 * - Loads all available albums for album reassignment dropdown
 * - Uses shared SongForm component configured for editing mode
 * - Connects to editSong server action for processing updates
 *
 * **Form Functionality**: The editing interface handles:
 * - Song name and release year updates
 * - Album reassignment with dropdown selection
 * - Audio file replacement (with automatic cleanup of old file)
 * - Duration updates (typically auto-calculated from new audio file)
 * - Form validation and error handling
 */
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
