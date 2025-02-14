import ArtistForm from "@/components/dashboard/artist-form";
import Link from "next/link";
import React from "react";

const ArtistCreatePage = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<Link
				className="mb-10 p-4 hover:cursor-pointer text-blue-500"
				href="/dashboard/artists"
			>
				Back to Artists
			</Link>
			<ArtistForm title="Create New Artist" />
		</div>
	);
};

export default ArtistCreatePage;
