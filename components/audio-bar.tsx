"use client";

import { useAudioBarContext } from "@/hooks/use-audio-bar-context";
import { Disc2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import LikeSongButton from "./like-song-button";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

const AudioBar = () => {
	const audioBar = useAudioBarContext();
	const user = authClient.useSession();

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
				<div className="flex flex-col text-xs">
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
			{user.data && audioBar.songID && (
				<div className="flex justify-center items-center">
					{audioBar.isLiked && (
						<LikeSongButton
							songID={parseInt(audioBar.songID)}
							isLikedInitially
						/>
					)}
					{!audioBar.isLiked && (
						<LikeSongButton
							songID={parseInt(audioBar.songID)}
							isLikedInitially={false}
						/>
					)}
				</div>
			)}
			{!user.data && !audioBar.songID && (
				<Button disabled variant="outline">
					Log in first
				</Button>
			)}
		</div>
	);
};

export default AudioBar;
