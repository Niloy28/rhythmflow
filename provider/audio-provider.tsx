"use client";

import { AudioContext } from "@/context/audio-context";
import { useState } from "react";

const AudioProvider = ({
	children,
	currentAudio,
}: {
	children: React.ReactNode;
	currentAudio?: string;
}) => {
	const [audio, setAudio] = useState(currentAudio ?? "");

	return (
		<AudioContext.Provider value={{ audio, setAudio }}>
			{children}
		</AudioContext.Provider>
	);
};

export default AudioProvider;
