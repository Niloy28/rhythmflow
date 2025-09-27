import { editAlbum } from "@/actions/admin/album-actions";
import AlbumForm from "@/components/dashboard/album-form";
import BackLink from "@/components/dashboard/back-link";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Album editing page for dashboard administration
 *
 * @param params - Route parameters containing the album ID to edit
 * @returns JSX element with pre-filled album editing form
 *
 * @remarks
 * This page enables editing of existing album records:
 * - Pre-populates form with current album data
 * - Loads all available artists for the artist selection dropdown
 * - Uses the shared AlbumForm component with edit-specific configuration
 * - Connects to editAlbum server action for form submission
 *
 * The form handles:
 * - Album name and release year updates
 * - Artist reassignment
 * - Album artwork replacement (with old file cleanup)
 *
 * Includes breadcrumb navigation showing the path back to album details
 * and the albums list. Redirects if the album doesn't exist.
 */
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
		redirect("/dashboard/albums");
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<BackLink target="albums" />
			<BackLink target={`albums/${album.id}`} name={album.name} />
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
