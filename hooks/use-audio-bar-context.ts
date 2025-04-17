"use client";

import { AudioBarContext } from "@/context/audio-bar-context";
import { useContext } from "react";

export const useAudioBarContext = () => {
	return useContext(AudioBarContext);
};
