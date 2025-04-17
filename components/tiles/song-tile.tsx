"use client";

import Image from "next/image";
import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { useAudioContext } from "@/hooks/use-audio-context";
import { useAlbumArtContext } from "@/hooks/use-album-art-context";
import { setAudioBarCookies } from "@/lib/server-utils";
import { useSongLikedContext } from "@/hooks/use-song-liked-context";

const SongTile = ({
	title,
	year,
	artist,
	audio,
	image,
	liked,
}: {
	title: string;
	year: number;
	artist: string;
	audio: string;
	image: string;
	liked: boolean;
}) => {
	const { setAudio } = useAudioContext();
	const { setAlbumArt } = useAlbumArtContext();
	const { setIsLiked } = useSongLikedContext();

	const onSongClick = async () => {
		setAudio(audio);
		setAlbumArt(image);
		setIsLiked(liked);

		await setAudioBarCookies(audio, image, liked);
	};

	return (
		<TooltipProvider>
			<div className="flex flex-col justify-center items-center">
				<Tooltip>
					<TooltipTrigger>
						<div
							className="m-2 w-24 h-24 hover:cursor-pointer"
							onClick={onSongClick}
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
