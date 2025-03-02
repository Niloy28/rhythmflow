"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAudioContext } from "@/hooks/use-audio-context";
import { useAlbumArtContext } from "@/hooks/use-album-art-context";
import SongTile from "./song-tile";

type SongListProp = {
	songs: {
		title: string;
		album_art: string;
		artist: string;
		year: number;
		audio: string;
	}[];
	setCookies: (audio: string, albumArt: string) => Promise<void>;
};

const SongList = ({ songs, setCookies }: SongListProp) => {
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
				<CardTitle className="text-2xl">Songs</CardTitle>
			</CardHeader>
			<CardContent className="flex gap-2">
				{songs.map((song, index) => (
					<SongTile
						key={index}
						title={song.title}
						artist={song.artist}
						year={song.year}
						image={song.album_art}
						onClick={() => onSongClick(song.audio, song.album_art)}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default SongList;
