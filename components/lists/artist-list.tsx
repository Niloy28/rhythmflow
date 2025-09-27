import React from "react";
import ArtistTile from "../tiles/artist-tile";

/**
 * Props for the ArtistList component
 */
type ArtistListProps = {
	/** Array of artist data for display */
	artists: {
		id: number | null;
		name: string;
		image: string;
	}[];
};

/**
 * Horizontal list component for displaying artist tiles
 *
 * @param props - Component props containing artist data array
 * @returns JSX element with titled artist grid layout
 *
 * @remarks
 * This component provides a structured layout for artist discovery:
 * - Displays "Artists" section header for content categorization
 * - Horizontal flex layout with consistent tile spacing
 * - Uses ArtistTile components for individual artist display
 * - Accommodates varying numbers of artists gracefully
 */
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
