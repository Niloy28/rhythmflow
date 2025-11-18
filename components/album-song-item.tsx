"use client";

import { setAudioBarCookies } from "@/lib/server-utils";
import { getFormattedDuration } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import LikeSongButton from "./like-song-button";
import { useAtom } from "jotai";
import audioBarAtom from "./atoms/audio-bar-atom";

/**
 * Props for the AlbumSongItem component
 */
type AlbumSongItemProps = {
	/** Song data including metadata and like status */
	song: {
		id: number | null;
		name: string;
		duration: number;
		audio: string;
		artist: string;
		album: string;
		albumArt: string;
		year: number;
		liked: boolean;
	};
	/** Optional CSS class name for styling */
	className?: string;
};

/**
 * Table row component for displaying a song within an album context
 *
 * @param props - Component props containing song data and styling options
 * @returns JSX element representing a clickable song row in an album table
 *
 * @remarks
 * This component renders a song as a table row specifically within album views:
 * - Displays song name, release year, duration, and like status
 * - Clicking the row loads the song into the global audio player
 * - Synchronizes like status with the global audio player state
 * - Updates browser cookies to persist audio player state
 */
const AlbumSongItem = ({ song, className }: AlbumSongItemProps) => {
	const [isLiked, setIsLiked] = useState(song.liked);
	const [audioBar, setAudioBar] = useAtom(audioBarAtom);

	// Sync like status when this song becomes the active song in audio player
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

		// Persist state in browser cookies for session continuity
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
				<LikeSongButton
					songID={song.id}
					isLikedInitially={isLiked}
					updateParentUILikeState={(liked) => setIsLiked(liked)}
				/>
			</TableCell>
		</TableRow>
	);
};

export default AlbumSongItem;
