"use client";

import { useAlbumArtContext } from "@/hooks/use-album-art-context";
import { useAudioContext } from "@/hooks/use-audio-context";
import { setAudioBarCookies } from "@/lib/server-utils";
import { getFormattedDuration } from "@/lib/utils";
import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { useSongLikedContext } from "@/hooks/use-song-liked-context";
import LikeSongButton from "./like-song-button";

type AlbumSongItemProps = {
	song: {
		id: number | null;
		name: string;
		duration: number;
		audio: string;
		album_art: string;
		year: number;
		liked: boolean;
	};
	className?: string;
};

const AlbumSongItem = ({ song, className }: AlbumSongItemProps) => {
	const { setAudio } = useAudioContext();
	const { setAlbumArt } = useAlbumArtContext();
	const { setIsLiked } = useSongLikedContext();

	const onSongItemClicked = async () => {
		setAudio(song.audio);
		setAlbumArt(song.album_art);
		setIsLiked(song.liked);

		await setAudioBarCookies(song.audio, song.album_art, song.liked);
	};

	console.log(song);

	return (
		<TableRow className={className} onClick={() => onSongItemClicked()}>
			<TableCell>{song.name}</TableCell>
			<TableCell>{song.year}</TableCell>
			<TableCell>{getFormattedDuration(song.duration)}</TableCell>
			<TableCell>
				<LikeSongButton songID={song.id} isLikedInitially={song.liked} />
			</TableCell>
		</TableRow>
	);
};

export default AlbumSongItem;
