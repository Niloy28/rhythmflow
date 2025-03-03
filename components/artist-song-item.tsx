"use client";

import { useAlbumArtContext } from "@/hooks/use-album-art-context";
import { useAudioContext } from "@/hooks/use-audio-context";
import { setAudioBarCookies } from "@/lib/server-utils";
import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { getFormattedDuration } from "@/lib/utils";
import Image from "next/image";

type ArtistSongItemProps = {
	song: {
		name: string;
		duration: number;
		audio: string;
		album: string;
		album_art: string;
		year: number;
	};
	className?: string;
};

const ArtistSongItem = ({ song, className }: ArtistSongItemProps) => {
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
			<TableCell>
				<div className="flex flex-col items-center gap-2">
					<Image
						src={song.album_art}
						alt={song.name}
						width={128}
						height={128}
						className="rounded-lg"
					/>
					<div className="font-semibold text-lg text-center">{song.album}</div>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default ArtistSongItem;
