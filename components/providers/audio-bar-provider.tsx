"use client";

import { AudioBarContext } from "@/context/audio-bar-context";
import { AudioBarDispatchContext } from "@/context/audio-bar-dispatch-context";
import { useReducer } from "react";

export type ACTION_TYPE =
	| { type: "SET_SONG_ID"; payload: string }
	| { type: "SET_SONG_NAME"; payload: string }
	| { type: "SET_ARTIST"; payload: string }
	| { type: "SET_ALBUM"; payload: string }
	| { type: "SET_YEAR"; payload: string }
	| { type: "SET_ALBUM_ART"; payload: string }
	| { type: "SET_AUDIO_SRC"; payload: string }
	| { type: "SET_IS_LIKED"; payload: boolean };

const AudioBarProvider = ({
	children,
	currentSongID,
	currentSongName,
	currentArtist,
	currentAlbum,
	currentYear,
	currentAlbumArt,
	currentAudioSrc,
	isCurrentlyLiked,
}: {
	children: React.ReactNode;
	currentSongID?: string;
	currentSongName?: string;
	currentArtist?: string;
	currentAlbum?: string;
	currentYear?: string;
	currentAlbumArt?: string;
	currentAudioSrc?: string;
	isCurrentlyLiked?: boolean;
}) => {
	const initialStates = {
		songID: currentSongID ?? "",
		songName: currentSongName ?? "",
		artist: currentArtist ?? "",
		album: currentAlbum ?? "",
		year: currentYear ?? "",
		albumArt: currentAlbumArt ?? "",
		audioSrc: currentAudioSrc ?? "",
		isLiked: isCurrentlyLiked ?? false,
	};

	const audioBarReducer = (
		audioBarData: typeof initialStates,
		action: ACTION_TYPE
	) => {
		switch (action.type) {
			case "SET_SONG_ID":
				return { ...audioBarData, songID: action.payload };

			case "SET_SONG_NAME":
				return { ...audioBarData, songName: action.payload };

			case "SET_ARTIST":
				return { ...audioBarData, artist: action.payload };

			case "SET_ALBUM":
				return { ...audioBarData, album: action.payload };

			case "SET_YEAR":
				return { ...audioBarData, year: action.payload };

			case "SET_ALBUM_ART":
				return { ...audioBarData, albumArt: action.payload };

			case "SET_AUDIO_SRC":
				return { ...audioBarData, audioSrc: action.payload };

			case "SET_IS_LIKED":
				return { ...audioBarData, isLiked: action.payload };

			default:
				return audioBarData;
		}
	};

	const [audioBarData, audioBarDispatch] = useReducer(
		audioBarReducer,
		initialStates
	);

	return (
		<AudioBarContext.Provider value={audioBarData}>
			<AudioBarDispatchContext.Provider value={audioBarDispatch}>
				{children}
			</AudioBarDispatchContext.Provider>
		</AudioBarContext.Provider>
	);
};

export default AudioBarProvider;
