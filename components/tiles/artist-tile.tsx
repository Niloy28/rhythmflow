import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

type ArtistTileProps = {
	artist: {
		id: number | null;
		name: string;
		image: string;
	};
};

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
