"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Tile from "./tile";
import { useAudioContext } from "@/hooks/use-audio-context";
import { useAlbumArtContext } from "@/hooks/use-album-art-context";

type SongProp = {
	songs: {
		title: string;
		album_art: string;
		audio: string;
	}[];
	setCookies: (audio: string, albumArt: string) => Promise<void>;
};

const SongList = ({ songs, setCookies }: SongProp) => {
	const { setAudio } = useAudioContext();
	const { setAlbumArt } = useAlbumArtContext();

	const onSongClick = async (audio: string, albumArt: string) => {
		setAudio(audio);
		setAlbumArt(albumArt);

		await setCookies(audio, albumArt);
	};

	return (
		<Card className="min-w-full">
			<CardHeader>
				<CardTitle>Songs</CardTitle>
			</CardHeader>
			<CardContent className="flex gap-2">
				{songs.map((song, index) => (
					<Tile
						key={index}
						image={song.album_art}
						onClick={() => onSongClick(song.audio, song.album_art)}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default SongList;
