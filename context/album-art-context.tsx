"use client";

import { createContext } from "react";

export const AlbumArtContext = createContext({
	albumArt: "",
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setAlbumArt: (albumArt: string) => {},
});
