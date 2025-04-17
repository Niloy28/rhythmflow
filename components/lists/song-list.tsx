import React from "react";
import SongTile from "../tiles/song-tile";

type SongListProps = {
	songs: {
		id: number | null;
		name: string;
		artist: string;
		album: string;
		year: number;
		albumArt: string;
		audio: string;
		liked: boolean;
	}[];
};

const SongList = ({ songs }: SongListProps) => {
	return (
		<div className="min-w-full">
			<h2 className="text-2xl font-semibold">Songs</h2>
			<div className="flex gap-2">
				{songs.map((song, index) => (
					<SongTile key={index} song={song} />
				))}
			</div>
		</div>
	);
};

export default SongList;
