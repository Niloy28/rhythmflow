"use client";

import { createContext } from "react";

export const AudioContext = createContext({
	audio: "",
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setAudio: (audio: string) => {},
});
