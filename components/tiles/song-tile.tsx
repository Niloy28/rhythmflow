"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { setAudioBarCookies } from "@/lib/server-utils";
import { useAudioBarDispatchContext } from "@/hooks/use-audio-bar-dispatch-context";
import LikeSongButton from "../like-song-button";
import { authClient } from "@/lib/auth-client";
import PlaylistMenu from "../playlist-menu";
import { cn } from "@/lib/utils";

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
	const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState(false);

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

	const { data } = authClient.useSession();

	return (
		<TooltipProvider>
			<div className="flex flex-col relative justify-center group items-center">
				<Tooltip>
					{/* Only show playlist buttons while logged in */}
					{data && data.user && (
						<div className="absolute top-4 right-4">
							<div
								className={cn(
									"flex flex-col gap-2 justify-end",
									!isPlaylistMenuOpen
										? "opacity-0 transition-opacity duration-300 ease-in delay-0 group-hover:opacity-100"
										: "opacity-100"
								)}
							>
								<LikeSongButton
									className="size-8"
									isLikedInitially={song.liked}
									songID={song.id}
								/>
								<PlaylistMenu
									songID={song.id!}
									className="size-8"
									onPlaylistMenuOpen={setIsPlaylistMenuOpen}
								/>
							</div>
						</div>
					)}
					<TooltipTrigger>
						<div
							className="m-2 w-36 h-42 flex flex-col justify-center rounded-lg hover:cursor-pointer border border-black dark:border-white"
							onClick={onSongClicked}
						>
							<Image
								src={song.albumArt}
								alt={song.name}
								width={192}
								height={192}
								className="rounded-lg w-full h-full"
							/>
							<p className="text-sm font-semibold">{song.name}</p>
						</div>
					</TooltipTrigger>
					<TooltipContent className="flex flex-col items-center justify-center">
						<p>{song.name}</p>
						<p>{song.artist}</p>
						<p>{song.year}</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
};

export default SongTile;
