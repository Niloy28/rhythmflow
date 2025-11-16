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
import LikeSongButton from "../like-song-button";
import { authClient } from "@/lib/auth-client";
import PlaylistMenu from "../playlist-menu";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import audioBarAtom from "../atoms/audio-bar-atom";

/**
 * Song data structure for the tile component.
 */
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

/**
 * Interactive tile component for displaying and playing songs.
 * Handles audio bar state updates, user interactions, and playlist management.
 * Shows like button and playlist menu for authenticated users.
 *
 * @param props - Component props containing song data
 * @returns JSX element containing the interactive song tile
 */
const SongTile = ({ song }: SongTileProp) => {
	const [audioBar, setAudioBar] = useAtom(audioBarAtom);
	const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState(false);

	/**
	 * Handles song selection by updating audio bar context and cookies.
	 * Dispatches all necessary song data to the audio bar state.
	 */
	const onSongClicked = async () => {
		setAudioBar({
			...audioBar,
			songID: song.id?.toString() || "",
			songName: song.name,
			artist: song.artist,
			album: song.album,
			albumArt: song.albumArt,
			audioSrc: song.audio,
			isLiked: song.liked,
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
