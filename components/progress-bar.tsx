"use client";

import React, { useState, useEffect } from "react";
import { formatTime } from "@/lib/utils";

const ProgressBar = ({
	currentTime,
	duration,
}: {
	currentTime: number;
	duration: number;
}) => {
	const [currentTimeFormatted, setCurrentTimeFormatted] = useState(
		formatTime(currentTime)
	);
	const [durationFormatted, setDurationFormatted] = useState(
		formatTime(duration)
	);
	const [progressPercentage, setProgressPercentage] = useState(0);

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
