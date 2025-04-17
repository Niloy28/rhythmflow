"use client";

import Image from "next/image";
import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { setAudioBarCookies } from "@/lib/server-utils";
import { useAudioBarDispatchContext } from "@/hooks/use-audio-bar-dispatch-context";

type SongTileProp = {
	song: {
		id: number | null;
		name: string;
		audio: string;
		artist: string;
		album: string;
		albumArt: string;
		year: number;
		liked: boolean;
	};
};

const SongTile = ({ song }: SongTileProp) => {
	const audioBarDispatch = useAudioBarDispatchContext();

	const onSongClicked = async () => {
		audioBarDispatch({
			type: "SET_SONG_ID",
			payload: song.id!.toString(),
		});

		audioBarDispatch({
			type: "SET_SONG_NAME",
			payload: song.name,
		});

		audioBarDispatch({
			type: "SET_ARTIST",
			payload: song.artist,
		});

		audioBarDispatch({
			type: "SET_ALBUM",
			payload: song.album,
		});

		audioBarDispatch({
			type: "SET_ALBUM_ART",
			payload: song.albumArt,
		});

		audioBarDispatch({
			type: "SET_AUDIO_SRC",
			payload: song.audio,
		});

		audioBarDispatch({
			type: "SET_IS_LIKED",
			payload: song.liked,
		});

		await setAudioBarCookies(
			song.id!,
			song.name,
			song.artist,
			song.album,
			song.year,
			song.albumArt,
			song.audio,
			song.liked
		);
	};

	return (
		<TooltipProvider>
			<div className="flex flex-col justify-center items-center">
				<Tooltip>
					<TooltipTrigger>
						<div
							className="m-2 w-24 h-24 hover:cursor-pointer"
							onClick={onSongClicked}
						>
							<Image
								src={song.albumArt}
								alt={song.name}
								width={96}
								height={96}
								className="rounded-lg w-full h-full"
							/>
						</div>
					</TooltipTrigger>
					<TooltipContent className="flex flex-col items-center justify-center">
						<p>{song.name}</p>
						<p>{song.artist}</p>
						<p>{song.year}</p>
					</TooltipContent>
				</Tooltip>
				<p className="text-sm font-semibold">{song.name}</p>
			</div>
		</TooltipProvider>
	);
};

export default SongTile;
