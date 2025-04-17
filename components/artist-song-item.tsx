"use client";

import { setAudioBarCookies } from "@/lib/server-utils";
import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { getFormattedDuration } from "@/lib/utils";
import Image from "next/image";
import LikeSongButton from "./like-song-button";
import { useAudioBarDispatchContext } from "@/hooks/use-audio-bar-dispatch-context";

type ArtistSongItemProps = {
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
	className?: string;
};

const ArtistSongItem = ({ song, className }: ArtistSongItemProps) => {
	const audioBarDispatch = useAudioBarDispatchContext();

	const onSongItemClicked = async () => {
		audioBarDispatch({
			type: "SET_SONG_ID",
			payload: song.id!.toString(),
		});

		audioBarDispatch({
			type: "SET_SONG_NAME",
			payload: song.name,
		});

		audioBarDispatch({
			type: "SET_ARTIST",
			payload: song.artist,
		});

		audioBarDispatch({
			type: "SET_ALBUM",
			payload: song.album,
		});

		audioBarDispatch({
			type: "SET_YEAR",
			payload: song.year.toString(),
		});

		audioBarDispatch({
			type: "SET_ALBUM_ART",
			payload: song.albumArt,
		});

		audioBarDispatch({
			type: "SET_AUDIO_SRC",
			payload: song.audio,
		});

		audioBarDispatch({
			type: "SET_IS_LIKED",
			payload: song.liked,
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
				<LikeSongButton songID={song.id} isLikedInitially={song.liked} />
			</TableCell>
		</TableRow>
	);
};

export default ArtistSongItem;
