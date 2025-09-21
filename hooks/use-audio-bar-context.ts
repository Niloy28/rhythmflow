"use client";

import { AudioBarContext } from "@/context/audio-bar-context";
import { useContext } from "react";

/**
 * Hook for accessing current audio player state
 *
 * @returns Current audio player context containing song metadata and playback info
 *
 * @remarks
 * Provides read-only access to the currently playing song's information
 * including track details, artwork, and like status. Used by components
 * that need to display or react to the current audio player state.
 *
 * @example
 * ```typescript
 * const { songName, artist, isLiked } = useAudioBarContext();
 * ```
 */
export const useAudioBarContext = () => {
	return useContext(AudioBarContext);
};
