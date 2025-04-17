"use client";

import { useAlbumArtContext } from "@/hooks/use-album-art-context";
import { useAudioContext } from "@/hooks/use-audio-context";
import { useSongLikedContext } from "@/hooks/use-song-liked-context";
import { Disc2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

const AudioBar = () => {
	const { audio } = useAudioContext();
	const { albumArt } = useAlbumArtContext();
	const { isLiked } = useSongLikedContext();

	return (
		<div className="bg-slate-300 dark:bg-slate-800 h-16 rounded-t-lg w-[93%] m-auto fixed top-[calc(100%-4rem)] flex justify-between p-2">
			{/* Album Display */}
			{/* TODO: Add spinning animation while playing audio */}
			<div className="flex items-center justify-center gap-4">
				{albumArt.length > 0 && (
					<Image
						src={albumArt}
						alt=""
						className="rounded-full"
						width={32}
						height={32}
					/>
				)}
				{albumArt.length === 0 && (
					<Disc2Icon size={32} className="text-foreground" />
				)}
			</div>
			<audio
				autoPlay={audio.length > 0}
				controls
				src={audio.length > 0 ? audio : undefined}
			/>
			<div className="flex justify-center items-center">
				{isLiked && "Liked"}
				{!isLiked && "Not Liked"}
			</div>
		</div>
	);
};

export default AudioBar;
