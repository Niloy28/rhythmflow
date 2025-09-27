import Image from "next/image";
import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

/**
 * Props for the AlbumTile component.
 */
interface AlbumTileProps {
	/** Album ID for navigation */
	id: number;
	/** Album title */
	title: string;
	/** Release year */
	year: number;
	/** Artist name */
	artist: string;
	/** Album cover image URL */
	image: string;
}

/**
 * Tile component for displaying album information in a grid layout.
 * Shows album cover, title, and provides detailed tooltip on hover.
 *
 * @param props - Component props
 * @returns JSX element containing the album tile with tooltip
 */
const AlbumTile = ({ id, title, year, artist, image }: AlbumTileProps) => {
	return (
		<TooltipProvider>
			<div className="flex flex-col justify-center items-center">
				<Tooltip>
					<TooltipTrigger>
						<Link href={`/album/${id}`}>
							<div className="m-2 w-24 h-24 hover:cursor-pointer">
								<Image
									src={image}
									alt={title}
									width={96}
									height={96}
									className="rounded-lg w-full h-full"
								/>
							</div>
						</Link>
					</TooltipTrigger>
					<TooltipContent className="flex flex-col items-center justify-center">
						<p>{title}</p>
						<p>{artist}</p>
						<p>{year}</p>
					</TooltipContent>
				</Tooltip>
				<p className="text-sm font-semibold">{title}</p>
			</div>
		</TooltipProvider>
	);
};

export default AlbumTile;
