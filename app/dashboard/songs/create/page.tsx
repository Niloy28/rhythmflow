import { createSong } from "@/actions/admin/song-actions";
import BackLink from "@/components/dashboard/back-link";
import SongForm from "@/components/dashboard/song-form";
import db from "@/lib/db";
import React from "react";

/**
 * Song creation page for dashboard administration
 *
 * @returns JSX element with empty song creation form
 *
 * @remarks
 * This page provides a comprehensive interface for adding new songs to the system:
 * - Uses the shared SongForm component without pre-filled data
 * - Loads all available albums for album selection dropdown
 * - Connects to createSong server action for form submission processing
 * - Includes breadcrumb navigation back to songs listing
 *
 * **Form Functionality**: The creation form collects:
 * - Song name with required validation
 * - Audio file upload with size and format validation
 * - Album assignment from available albums dropdown
 * - Release year specification
 * - Duration calculation (often auto-extracted from audio file metadata)
 *
 * **Upload Process**: Upon successful submission:
 * 1. Form validation ensures all required fields are present
 * 2. Audio file is uploaded to R2 storage with integrity checking
 * 3. Song metadata is stored in database with file URL reference
 * 4. User is redirected to songs dashboard with success confirmation
 */
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
