"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Volume1, Volume2, VolumeX } from "lucide-react";

const VolumeSlider = ({
	changeVolume,
}: {
	changeVolume: (volume: number) => void;
}) => {
	const [volume, setVolume] = useState(50);
	const [volumeBeforeMute, setVolumeBeforeMute] = useState(volume);

	useEffect(() => {
		changeVolume(volume);
	}, [volume, changeVolume]);

	const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVolume(parseInt(e.currentTarget.value));
	};

	const toggleMute = () => {
		if (volume === 0) {
			setVolume(volumeBeforeMute);
		} else {
			setVolumeBeforeMute(volume);
			setVolume(0);
		}
	};

	const getVolumeIcon = () => {
		if (volume === 0) return VolumeX;
		if (volume < 50) return Volume1;
		return Volume2;
	};

	const VolumeIcon = getVolumeIcon();

	return (
		<div className="flex gap-2 justify-around items-center">
			<VolumeIcon
				size={32}
				onClick={toggleMute}
				className="opacity-60 transition duration-100 ease-linear hover:opacity-100 hover:scale-105 cursor-pointer"
			/>
			<Input
				type="range"
				min={0}
				max={100}
				id="volume-slider"
				value={volume}
				onChange={handleSliderChange}
				className="cursor-pointer bg-accent-foreground accent-foreground"
			/>
		</div>
	);
};

export default VolumeSlider;
