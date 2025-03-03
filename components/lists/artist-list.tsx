import React from "react";
import ArtistTile from "../tiles/artist-tile";

type ArtistListProps = {
	artists: {
		id: number | null;
		name: string;
		image: string;
	}[];
};

const ArtistList = ({ artists }: ArtistListProps) => {
	return (
		<div className="min-w-full">
			<h2 className="text-2xl font-semibold">Artists</h2>
			<div className="flex gap-2">
				{artists.map((artist, index) => (
					<ArtistTile key={index} artist={artist} />
				))}
			</div>
		</div>
	);
};

export default ArtistList;
