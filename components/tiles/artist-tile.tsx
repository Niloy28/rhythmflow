import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

/**
 * Artist data structure for the tile component.
 */
type ArtistTileProps = {
	artist: {
		id: number | null;
		name: string;
		image: string;
	};
};

/**
 * Tile component for displaying artist information in a card layout.
 * Shows artist image and name with navigation to artist detail page.
 *
 * @param props - Component props containing artist data
 * @returns JSX element containing the artist tile card
 */
const ArtistTile = ({ artist }: ArtistTileProps) => {
	return (
		<Link className="w-64 h-96" href={`/artist/${artist.id!}`}>
			<Card className="w-full h-full rounded-lg">
				<div className="flex flex-col items-center justify-center gap-2 h-full">
					<div className="relative w-full grow">
						<Image
							src={artist.image}
							alt={artist.name}
							fill
							className="w-full h-full rounded-t-lg object-cover"
						/>
					</div>
					<div className="font-semibold pb-2">{artist.name}</div>
				</div>
			</Card>
		</Link>
	);
};

export default ArtistTile;
