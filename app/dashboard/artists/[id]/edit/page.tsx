import { editArtist } from "@/actions/admin/artist-actions";
import ArtistForm from "@/components/dashboard/artist-form";
import BackLink from "@/components/dashboard/back-link";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Artist editing page for dashboard administration
 *
 * @param params - Route parameters containing the artist ID to edit
 * @returns JSX element with pre-filled artist editing form
 *
 * @remarks
 * This page enables modification of existing artist records:
 * - Pre-populates the form with current artist data (name, profile image)
 * - Uses the shared ArtistForm component configured for editing mode
 * - Connects to editArtist server action for form submission processing
 * - Includes breadcrumb navigation showing path back to artist details and list
 *
 * **Form Functionality**: The editing form handles:
 * - Artist name updates with validation
 * - Profile image replacement (automatically removes old image from storage)
 * - Form validation and error handling
 * - Redirect to artist details page upon successful update
 *
 * **Data Flow**:
 * 1. Fetches current artist data from database
 * 2. Passes data to reusable ArtistForm component
 * 3. Form submission triggers editArtist server action
 * 4. Server action updates database and handles file operations
 */
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
				title="Edit Artist"
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
