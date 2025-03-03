"use client";

import { useAlbumArtContext } from "@/hooks/use-album-art-context";
import { useAudioContext } from "@/hooks/use-audio-context";
import { setAudioBarCookies } from "@/lib/server-utils";
import { cn, getFormattedDuration } from "@/lib/utils";
import React from "react";

type AlbumSongItemProps = {
	song: {
		name: string;
		duration: number;
		audio: string;
		album_art: string;
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
		<div
			className={cn("flex items-center justify-between p-2 m-2", className)}
			onClick={() => onSongItemClicked()}
		>
			<p>{song.name}</p>
			<p>{getFormattedDuration(song.duration)}</p>
		</div>
	);
};

export default AlbumSongItem;
