"use client";

import { AudioBarDispatchContext } from "@/context/audio-bar-dispatch-context";
import { useContext } from "react";

/**
 * Hook for accessing audio player state dispatch function
 *
 * @returns Dispatch function for updating audio player state
 * @throws Error if used outside of AudioBarProvider
 *
 * @remarks
 * Provides access to the dispatch function that allows components to
 * update the audio player state (e.g., play new song, update like status).
 *
 * This hook includes error boundary protection to ensure it's only used
 * within components that are wrapped by the AudioBarProvider. This prevents
 * runtime errors from attempting to dispatch actions without a reducer.
 *
 * @example
 * ```typescript
 * const dispatch = useAudioBarDispatchContext();
 * dispatch({ type: 'PLAY_SONG', payload: songData });
 * ```
 */
export const useAudioBarDispatchContext = () => {
	const audioBarDispatchContext = useContext(AudioBarDispatchContext);

	if (audioBarDispatchContext === null) {
		throw new Error(
			"useAudioBarDispatchContext must be used within an AudioBarProvider"
		);
	}

	return audioBarDispatchContext;
};
