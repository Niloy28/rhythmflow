"use client";

import { useAudioBarContext } from "@/hooks/use-audio-bar-context";
import { Disc2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

const AudioBar = () => {
	const audioBar = useAudioBarContext();

	return (
		<div className="bg-slate-300 dark:bg-slate-800 h-16 rounded-t-lg w-[93%] m-auto fixed top-[calc(100%-4rem)] flex justify-between p-2">
			{/* Album Display */}
			{/* TODO: Add spinning animation while playing audio */}
			<div className="flex items-center justify-center gap-4">
				{audioBar.albumArt.length > 0 && (
					<Image
						src={audioBar.albumArt}
						alt=""
						className="rounded-full"
						width={32}
						height={32}
					/>
				)}
				{audioBar.albumArt.length === 0 && (
					<Disc2Icon size={32} className="text-foreground" />
				)}
				<div>
					<p>{audioBar.songName}</p>
					<p>{audioBar.artist}</p>
					<p>{audioBar.album}</p>
					<p>{audioBar.year}</p>
				</div>
			</div>
			<audio
				autoPlay={audioBar.audioSrc.length > 0}
				controls
				src={audioBar.audioSrc.length > 0 ? audioBar.audioSrc : undefined}
			/>
			<div className="flex justify-center items-center">
				{audioBar.isLiked && "Liked"}
				{!audioBar.isLiked && "Not Liked"}
			</div>
		</div>
	);
};

export default AudioBar;
