"use client";

import { createContext } from "react";

export const AudioBarContext = createContext({
	songID: "",
	songName: "",
	artist: "",
	album: "",
	year: "",
	albumArt: "",
	audioSrc: "",
	isLiked: false,
});
