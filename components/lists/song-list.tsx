import React from "react";
import SongTile from "../tiles/song-tile";

type SongListProps = {
	songs: {
		title: string;
		album_art: string;
		artist: string;
		year: number;
		audio: string;
	}[];
};

const SongList = ({ songs }: SongListProps) => {
	return (
		<div className="min-w-full">
			<h2 className="text-2xl font-semibold">Songs</h2>
			<div className="flex gap-2">
				{songs.map((song, index) => (
					<SongTile
						key={index}
						title={song.title}
						artist={song.artist}
						audio={song.audio}
						year={song.year}
						image={song.album_art}
					/>
				))}
			</div>
		</div>
	);
};

export default SongList;
