"use client";

import { useAlbumArtContext } from "@/hooks/use-album-art-context";
import { useAudioContext } from "@/hooks/use-audio-context";
import { setAudioBarCookies } from "@/lib/server-utils";
import { getFormattedDuration } from "@/lib/utils";
import React from "react";
import { TableCell, TableRow } from "./ui/table";

type AlbumSongItemProps = {
	song: {
		name: string;
		duration: number;
		audio: string;
		album_art: string;
		year: number;
	};
	className?: string;
};

const AlbumSongItem = ({ song, className }: AlbumSongItemProps) => {
	const { setAudio } = useAudioContext();
	const { setAlbumArt } = useAlbumArtContext();

	const onSongItemClicked = async () => {
		setAudio(song.audio);
		setAlbumArt(song.album_art);

		await setAudioBarCookies(song.audio, song.album_art);
	};

	return (
		<TableRow className={className} onClick={() => onSongItemClicked()}>
			<TableCell>{song.name}</TableCell>
			<TableCell>{song.year}</TableCell>
			<TableCell>{getFormattedDuration(song.duration)}</TableCell>
		</TableRow>
	);
};

export default AlbumSongItem;
