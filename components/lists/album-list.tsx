import React from "react";
import AlbumTile from "../tiles/album-tile";

/**
 * Props for the AlbumList component
 */
type AlbumListProps = {
	/** Array of album data for display */
	albums: {
		id: number;
		title: string;
		artist: string;
		year: number;
		image: string;
	}[];
};

/**
 * Horizontal scrolling list component for displaying album tiles
 *
 * @param props - Component props containing album data array
 * @returns JSX element with titled album grid layout
 *
 * @remarks
 * This component provides a clean layout for album browsing:
 * - Displays "Albums" section header for clear content categorization
 * - Horizontal flex layout for album tiles with consistent spacing
 * - Uses AlbumTile components for individual album display
 * - Full-width container accommodates various album collection sizes
 */
const AlbumList = ({ albums }: AlbumListProps) => {
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
