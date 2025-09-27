import { createAlbum } from "@/actions/admin/album-actions";
import AlbumForm from "@/components/dashboard/album-form";
import BackLink from "@/components/dashboard/back-link";
import db from "@/lib/db";
import React from "react";

/**
 * Album creation page for dashboard administration
 *
 * @returns JSX element with empty album creation form
 *
 * @remarks
 * This page provides a form interface for creating new albums:
 * - Uses the shared AlbumForm component without pre-filled data
 * - Loads all available artists for the artist selection dropdown
 * - Connects to createAlbum server action for form submission
 * - Includes breadcrumb navigation back to albums list
 *
 * The form collects:
 * - Album name and release year
 * - Associated artist selection
 * - Album artwork image upload
 *
 * Upon successful submission, the server action handles file upload
 * to R2 storage and database record creation before redirecting
 * back to the albums dashboard.
 */
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
