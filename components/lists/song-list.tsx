import React from "react";
import SongTile from "../tiles/song-tile";

/**
 * Props for the SongList component
 */
type SongListProps = {
	/** Array of song data for display */
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

/**
 * Horizontal scrolling list component for displaying song tiles
 *
 * @param props - Component props containing song data array
 * @returns JSX element with titled song grid layout
 *
 * @remarks
 * This component provides a scrollable song browsing interface:
 * - Displays "Songs" section header for clear content categorization
 * - Horizontal scrolling container for handling large song collections
 * - Uses SongTile components for individual song display and interaction
 * - Overflow scroll prevents layout breaking with many songs
 */
const SongList = ({ songs }: SongListProps) => {
	return (
		<div className="w-full">
			<h2 className="text-2xl font-semibold">Songs</h2>
			<div className="flex max-w-full gap-2 overflow-x-scroll">
				{songs.map((song, index) => (
					<SongTile key={index} song={song} />
				))}
			</div>
		</div>
	);
};

export default SongList;
