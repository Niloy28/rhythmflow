"use client";

import { AudioContext } from "@/context/audio-context";
import { useContext } from "react";

export const useAudioContext = () => {
	return useContext(AudioContext);
};
