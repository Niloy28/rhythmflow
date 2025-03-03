import Image from "next/image";
import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

const SongTile = ({
	title,
	year,
	artist,
	image,
	onClick,
}: {
	title: string;
	year: number;
	artist: string;
	image: string;
	onClick: () => void;
}) => {
	return (
		<TooltipProvider>
			<div className="flex flex-col justify-center items-center">
				<Tooltip>
					<TooltipTrigger>
						<div
							className="m-2 w-24 h-24 hover:cursor-pointer"
							onClick={onClick}
						>
							<Image
								src={image}
								alt={title}
								width={96}
								height={96}
								className="rounded-lg w-full h-full"
							/>
						</div>
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

export default SongTile;
