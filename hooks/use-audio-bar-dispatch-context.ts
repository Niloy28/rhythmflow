"use client";

import { AudioBarDispatchContext } from "@/context/audio-bar-dispatch-context";
import { useContext } from "react";

export const useAudioBarDispatchContext = () => {
	const audioBarDispatchContext = useContext(AudioBarDispatchContext);

	if (audioBarDispatchContext === null) {
		throw new Error(
			"useAudioBarDispatchContext must be used within an AudioBarProvider"
		);
	}

	return audioBarDispatchContext;
};
