import { createArtist } from "@/actions/admin/artist-actions";
import ArtistForm from "@/components/dashboard/artist-form";
import BackLink from "@/components/dashboard/back-link";
import React from "react";

/**
 * Artist creation page for dashboard administration
 *
 * @returns JSX element with empty artist creation form
 *
 * @remarks
 * This page provides a clean interface for creating new artist profiles:
 * - Uses the shared ArtistForm component without pre-filled data
 * - Connects to createArtist server action for form submission
 * - Includes breadcrumb navigation back to the artists listing
 * - Centered layout provides focused creation experience
 *
 * **Form Functionality**: The creation form collects:
 * - Artist name with required validation
 * - Profile image upload with size and type validation
 * - Automatic form validation before submission
 *
 * **Workflow**: Upon successful submission:
 * 1. Server action validates form data
 * 2. Profile image is uploaded to R2 storage
 * 3. Artist record is created in database with image URL
 * 4. User is redirected to artists dashboard with success confirmation
 */
const ArtistCreatePage = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<BackLink target="artists" />
			<ArtistForm title="Create New Artist" action={createArtist} />
		</div>
	);
};

export default ArtistCreatePage;
