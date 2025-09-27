"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Volume1, Volume2, VolumeX } from "lucide-react";

/**
 * Props for the VolumeSlider component.
 */
interface VolumeSliderProps {
	/** Callback function to handle volume changes */
	changeVolume: (volume: number) => void;
}

/**
 * Volume control component with slider and mute functionality.
 * Provides visual volume level indicator and click-to-mute capability.
 *
 * @param props - Component props
 * @returns JSX element containing the volume slider and icon
 */
const VolumeSlider = ({ changeVolume }: VolumeSliderProps) => {
	const [volume, setVolume] = useState(50);
	const [volumeBeforeMute, setVolumeBeforeMute] = useState(volume);

	/**
	 * Calls the changeVolume callback whenever volume state changes.
	 */
	useEffect(() => {
		changeVolume(volume);
	}, [volume, changeVolume]);

	/**
	 * Handles slider input changes and updates volume state.
	 *
	 * @param e - Change event from the range input
	 */
	const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVolume(parseInt(e.currentTarget.value));
	};

	/**
	 * Toggles between muted (0) and previous volume level.
	 * Stores previous volume for restoration after unmuting.
	 */
	const toggleMute = () => {
		if (volume === 0) {
			setVolume(volumeBeforeMute);
		} else {
			setVolumeBeforeMute(volume);
			setVolume(0);
		}
	};

	/**
	 * Returns appropriate volume icon component based on current volume level.
	 *
	 * @returns Volume icon component (VolumeX, Volume1, or Volume2)
	 */
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
