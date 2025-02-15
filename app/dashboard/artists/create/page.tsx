import { createArtist } from "@/actions/admin/artist-actions";
import ArtistForm from "@/components/dashboard/artist-form";
import BackLink from "@/components/dashboard/back-link";
import React from "react";

const ArtistCreatePage = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<BackLink target="artists" />
			<ArtistForm title="Create New Artist" action={createArtist} />
		</div>
	);
};

export default ArtistCreatePage;
