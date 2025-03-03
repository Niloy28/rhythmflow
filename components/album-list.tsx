import React from "react";
import AlbumTile from "./album-tile";

type AlbumListProp = {
	albums: {
		id: number;
		title: string;
		artist: string;
		year: number;
		image: string;
	}[];
};

const AlbumList = ({ albums }: AlbumListProp) => {
	return (
		<div className="min-w-full">
			<h2 className="text-2xl font-semibold">Albums</h2>
			<div className="flex gap-2">
				{albums.map((album, index) => (
					<AlbumTile
						key={index}
						id={album.id}
						title={album.title}
						artist={album.artist}
						year={album.year}
						image={album.image}
					/>
				))}
			</div>
		</div>
	);
};

export default AlbumList;
