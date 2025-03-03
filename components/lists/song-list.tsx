"use client";

import React from "react";
import { useAudioContext } from "@/hooks/use-audio-context";
import { useAlbumArtContext } from "@/hooks/use-album-art-context";
import SongTile from "../tiles/song-tile";
import { setAudioBarCookies } from "@/lib/server-utils";

type SongListProps = {
	songs: {
		title: string;
		album_art: string;
		artist: string;
		year: number;
		audio: string;
	}[];
};

const SongList = ({ songs }: SongListProps) => {
	const { setAudio } = useAudioContext();
	const { setAlbumArt } = useAlbumArtContext();

	const onSongClick = async (audio: string, albumArt: string) => {
		setAudio(audio);
		setAlbumArt(albumArt);

		await setAudioBarCookies(audio, albumArt);
	};

	return (
		<div className="min-w-full">
			<h2 className="text-2xl font-semibold">Songs</h2>
			<div className="flex gap-2">
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
			</div>
		</div>
	);
};

export default SongList;
