"use client";

import { setAudioBarCookies } from "@/lib/server-utils";
import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "./ui/table";
import { getFormattedDuration } from "@/lib/utils";
import Image from "next/image";
import LikeSongButton from "./like-song-button";
import { useAtom } from "jotai";
import audioBarAtom from "./atoms/audio-bar-atom";

/**
 * Props for the ArtistSongItem component
 */
type ArtistSongItemProps = {
	/** Song data including metadata and like status */
	song: {
		id: number | null;
		name: string;
		duration: number;
		audio: string;
		album: string;
		artist: string;
		albumArt: string;
		year: number;
		liked: boolean;
	};
	/** Optional CSS class name for styling */
	className?: string;
};

/**
 * Table row component for displaying a song within an artist discography context
 *
 * @param props - Component props containing song data and styling options
 * @returns JSX element representing a clickable song row in an artist's song table
 *
 * @remarks
 * This component renders a song as a table row specifically within artist views:
 * - Displays song name, release year, duration, album info, and like status
 * - Shows album artwork and name in a dedicated column
 * - Clicking the row loads the song into the global audio player
 * - Synchronizes like status with the global audio player state
 */
const ArtistSongItem = ({ song, className }: ArtistSongItemProps) => {
	const [isLiked, setIsLiked] = useState(song.liked);
	const [audioBar, setAudioBar] = useAtom(audioBarAtom);

	// Sync like status with global audio player state
	useEffect(() => {
		if (audioBar.songID === song.id?.toString()) {
			setIsLiked(audioBar.isLiked);
		}
	}, [audioBar, song.id]);

	/**
	 * Handles song selection and audio player state updates
	 */
	const onSongItemClicked = async () => {
		setAudioBar({
			...audioBar,
			songID: song.id?.toString() || "",
			songName: song.name,
			artist: song.artist,
			album: song.album,
			albumArt: song.albumArt,
			audioSrc: song.audio,
			isLiked: isLiked,
		});

		// Persist state in cookies
		await setAudioBarCookies(
			song.id!,
			song.name,
			song.artist,
			song.album,
			song.year,
			song.albumArt,
			song.audio,
			isLiked
		);
	};

	return (
		<TableRow className={className} onClick={() => onSongItemClicked()}>
			<TableCell>{song.name}</TableCell>
			<TableCell>{song.year}</TableCell>
			<TableCell>{getFormattedDuration(song.duration)}</TableCell>
			<TableCell>
				<div className="flex flex-col items-center gap-2">
					<Image
						src={song.albumArt}
						alt={song.name}
						width={128}
						height={128}
						className="rounded-lg"
					/>
					<div className="font-semibold text-lg text-center">{song.album}</div>
				</div>
			</TableCell>
			<TableCell>
				<LikeSongButton
					songID={song.id}
					isLikedInitially={isLiked}
					updateParentUILikeState={(liked) => setIsLiked(liked)}
				/>
			</TableCell>
		</TableRow>
	);
};

export default ArtistSongItem;
