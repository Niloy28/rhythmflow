"use client";

import { AudioBarContext } from "@/context/audio-bar-context";
import { AudioBarDispatchContext } from "@/context/audio-bar-dispatch-context";
import { useReducer } from "react";

/**
 * Action types for the audio bar reducer.
 */
export type ACTION_TYPE =
	| { type: "SET_SONG_ID"; payload: string }
	| { type: "SET_SONG_NAME"; payload: string }
	| { type: "SET_ARTIST"; payload: string }
	| { type: "SET_ALBUM"; payload: string }
	| { type: "SET_YEAR"; payload: string }
	| { type: "SET_ALBUM_ART"; payload: string }
	| { type: "SET_AUDIO_SRC"; payload: string }
	| { type: "SET_IS_LIKED"; payload: boolean };

/**
 * Props for the AudioBarProvider component.
 */
interface AudioBarProviderProps {
	/** Child components to render */
	children: React.ReactNode;
	/** Initial song ID for the audio bar state */
	currentSongID?: string;
	/** Initial song name for the audio bar state */
	currentSongName?: string;
	/** Initial artist name for the audio bar state */
	currentArtist?: string;
	/** Initial album name for the audio bar state */
	currentAlbum?: string;
	/** Initial year for the audio bar state */
	currentYear?: string;
	/** Initial album art URL for the audio bar state */
	currentAlbumArt?: string;
	/** Initial audio source URL for the audio bar state */
	currentAudioSrc?: string;
	/** Initial liked state for the audio bar */
	isCurrentlyLiked?: boolean;
}

/**
 * Context provider for managing audio bar state using React reducer.
 * Provides both state and dispatch contexts to child components.
 * Handles all audio player data including song metadata and playback state.
 *
 * @param props - Component props containing initial state values
 * @returns JSX element providing audio bar contexts to children
 */
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
}: AudioBarProviderProps) => {
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

	/**
	 * Reducer function for managing audio bar state updates.
	 *
	 * @param audioBarData - Current state of the audio bar
	 * @param action - Action to perform on the state
	 * @returns Updated audio bar state
	 */
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
