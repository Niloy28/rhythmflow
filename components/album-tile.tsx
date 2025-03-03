import Image from "next/image";
import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

const AlbumTile = ({
	id,
	title,
	year,
	artist,
	image,
}: {
	id: number;
	title: string;
	year: number;
	artist: string;
	image: string;
}) => {
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
