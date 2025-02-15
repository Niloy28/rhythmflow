import ArtistForm from "@/components/dashboard/artist-form";
import BackLink from "@/components/dashboard/back-link";
import React from "react";

const ArtistCreatePage = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<BackLink target="artists" />
			<ArtistForm title="Create New Artist" />
		</div>
	);
};

export default ArtistCreatePage;
