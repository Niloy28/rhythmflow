"use client";

import { createContext } from "react";

/**
 * React context for sharing audio player state across components
 *
 * @remarks
 * Provides read-only access to the currently playing song's metadata
 * including track information, artwork, and like status. This context
 * is consumed by audio player components, song cards, and navigation bars
 * to display consistent current song information.
 *
 * Default values represent an empty/uninitialized state where no song
 * is currently selected or playing.
 */
export const AudioBarContext = createContext({
	/** Unique identifier of the currently playing song */
	songID: "",
	/** Display name of the current song */
	songName: "",
	/** Name of the performing artist */
	artist: "",
	/** Album name containing the song */
	album: "",
	/** Release year as string for display purposes */
	year: "",
	/** URL to album artwork image */
	albumArt: "",
	/** URL to the audio file for streaming */
	audioSrc: "",
	/** Whether the current user has liked this song */
	isLiked: false,
});
