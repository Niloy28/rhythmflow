"use client";

import { Disc2Icon, Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import LikeSongButton from "./like-song-button";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import ProgressBar from "./progress-bar";
import VolumeSlider from "./volume-slider";
import { useAtomValue } from "jotai";
import audioBarAtom from "./atoms/audio-bar-atom";

/**
 * Persistent audio player component that appears at the bottom of the screen
 *
 * @returns JSX element representing the global audio player interface
 *
 * @remarks
 * This component provides the main audio playback interface for the application:
 * - Fixed positioning at the bottom of the screen
 * - Displays currently playing song metadata and artwork
 * - Provides play/pause controls and volume adjustment
 * - Shows playback progress with interactive progress bar
 * - Includes like functionality for authenticated users
 */
const AudioBar = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement>(null);
	const audioBar = useAtomValue(audioBarAtom);
	const user = authClient.useSession();

	// Set up audio event listeners for progress tracking
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);

		const handleEnded = () => {
			setIsPlaying(false);
			setCurrentTime(0);
		};

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);
		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, []);

	// Sync playing state with audio element
	useEffect(() => {
		setIsPlaying(!audioRef.current?.paused);
	}, [audioRef.current?.paused]);

	/**
	 * Toggles between play and pause states
	 */
	const togglePlayPause = async () => {
		const audio = audioRef.current;
		if (!audio) return;

		try {
			if (isPlaying) {
				audio.pause();
				setIsPlaying(false);
			} else {
				await audio.play();
				setIsPlaying(true);
			}
		} catch (error) {
			console.error("Audio playback error:", error);
		}
	};

	return (
		<div className="bg-slate-300 dark:bg-slate-800 h-16 rounded-t-lg w-[93%] fixed top-[calc(100%-4rem)] flex gap-2 p-2">
			{/* Album Display */}
			<div className="flex items-center justify-center gap-4">
				{audioBar.albumArt.length > 0 && (
					<Image
						src={audioBar.albumArt}
						alt=""
						className={`rounded-full animate-${isPlaying ? "spin" : "none"}`}
						width={32}
						height={32}
					/>
				)}
				{audioBar.albumArt.length === 0 && (
					<Disc2Icon size={32} className="text-foreground" />
				)}
				<div className="flex flex-col text-xs">
					<p className="font-bold text-xl">{audioBar.songName}</p>
					<p className="opacity-60">{audioBar.artist}</p>
				</div>
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

			{/* Controls */}
			<div className="flex flex-grow gap-4 items-center px-4">
				<button
					onClick={togglePlayPause}
					className="w-10 h-10 rounded-full bg-gradient-to-br from-foreground to-muted-foreground shadow-2xl flex items-center justify-center hover:from-muted-foreground hover:to-accent-foreground transform hover:scale-105 transition-all duration-200 active:scale-95"
				>
					{isPlaying ? (
						<Pause className="w-6 h-6 text-gray-800 ml-0" fill="currentColor" />
					) : (
						<Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
					)}
				</button>

				<ProgressBar currentTime={currentTime} duration={duration} />
			</div>

			<VolumeSlider
				changeVolume={(volume) => {
					audioRef!.current!.volume = volume / 100.0;
				}}
			/>

			{/* Hidden audio element */}
			<audio
				ref={audioRef}
				autoPlay
				// @ts-expect-error Allow null to be passed as src in case of audioSrc being empty string
				src={audioBar.audioSrc === "" ? null : audioBar.audioSrc}
				preload="metadata"
			/>
		</div>
	);
};

export default AudioBar;
