"use client";

import React, { useState, useEffect } from "react";
import { formatTime } from "@/lib/utils";

/**
 * Props for the ProgressBar component.
 */
interface ProgressBarProps {
	/** Current playback time in seconds */
	currentTime: number;
	/** Total duration of the media in seconds */
	duration: number;
}

/**
 * Progress bar component that displays current playback progress.
 * Shows current time, total duration, and a visual progress indicator.
 *
 * @param props - Component props
 * @returns JSX element containing the progress bar with time displays
 */
const ProgressBar = ({ currentTime, duration }: ProgressBarProps) => {
	const [currentTimeFormatted, setCurrentTimeFormatted] = useState(
		formatTime(currentTime)
	);
	const [durationFormatted, setDurationFormatted] = useState(
		formatTime(duration)
	);
	const [progressPercentage, setProgressPercentage] = useState(0);

	/**
	 * Updates formatted time strings and progress percentage when time values change.
	 */
	useEffect(() => {
		setCurrentTimeFormatted(formatTime(currentTime));
		setDurationFormatted(formatTime(duration));
		setProgressPercentage(duration ? (currentTime / duration) * 100 : 0);
	}, [currentTime, duration]);

	return (
		<div className="w-full">
			<div className="flex justify-between text-sm text-gray-300 mb-2">
				<span>{currentTimeFormatted}</span>
				<span>{durationFormatted}</span>
			</div>
			<div className="w-full h-2 bg-background rounded-full overflow-hidden">
				<div
					className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-100 ease-linear"
					style={{ width: `${progressPercentage}%` }}
				/>
			</div>
		</div>
	);
};

export default ProgressBar;
