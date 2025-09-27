"use client";

import { likeSong, removeSongLike } from "@/actions/playlist-actions";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useAudioBarDispatchContext } from "@/hooks/use-audio-bar-dispatch-context";
import { useAudioBarContext } from "@/hooks/use-audio-bar-context";
import { setLikedSongCookie } from "@/lib/server-utils";

/**
 * Props for the LikeSongButton component
 */
interface LikeSongButtonProps {
	/** ID of the song to like/unlike */
	songID: number | null;
	/** Initial like status for the button */
	isLikedInitially: boolean;
	/** Optional callback to update parent component's like state */
	updateParentUILikeState?: (isLiked: boolean) => void;
	/** Optional CSS class name for styling */
	className?: string;
}

/**
 * Interactive button component for liking/unliking songs
 *
 * @param props - Component props including song ID and state management
 * @returns JSX element with heart icon that toggles like status
 *
 * @remarks
 * This component provides comprehensive like functionality across the application:
 * - Visual heart icon that fills/unfills based on like status
 * - Integrates with server actions for persistent like storage
 * - Synchronizes with global audio player state
 * - Updates browser cookies for state persistence
 *
 * **Visual States**:
 * - Liked: Filled red heart icon
 * - Not liked: Outlined heart icon
 * - Loading: Spinner animation during server operations
 */
const LikeSongButton = ({
	songID,
	isLikedInitially,
	updateParentUILikeState,
	className,
}: LikeSongButtonProps) => {
	const [isLiked, setIsLiked] = useState(isLikedInitially);
	const audioBar = useAudioBarContext();
	const audioBarDispatch = useAudioBarDispatchContext();
	const { pending } = useFormStatus();

	// Icon definitions for different states
	const likedIcon = <Heart fill="red" color="red" />;
	const notLikedIcon = <Heart />;

	// Sync with initial prop changes
	useEffect(() => {
		setIsLiked(isLikedInitially);
	}, [isLikedInitially]);

	// Update global audio player state when like status changes
	useEffect(() => {
		if (audioBar.songID === songID?.toString()) {
			audioBarDispatch({
				type: "SET_IS_LIKED",
				payload: isLiked,
			});
		}
	}, [isLiked, audioBar.songID, audioBarDispatch, songID]);

	// Update cookie when like status changes for current audio player song
	useEffect(() => {
		async function updateLikedCookie() {
			if (audioBar.songID === songID?.toString()) {
				await setLikedSongCookie(isLiked);
			}
		}

		updateLikedCookie();
	}, [audioBar.songID, isLiked, songID]);

	if (songID === null) {
		throw new Error("songID is null");
	}

	return (
		<Button
			onClick={async (e) => {
				e.preventDefault();
				e.stopPropagation();

				const formData = new FormData();
				formData.set("song_id", songID.toString());

				if (isLiked) {
					removeSongLike(formData);

					setIsLiked(false);
					updateParentUILikeState?.(false);
				} else {
					likeSong(formData);

					setIsLiked(true);
					updateParentUILikeState?.(true);
				}
			}}
			variant="outline"
			disabled={Number.isNaN(songID)}
			className={className}
		>
			{pending && <Loader2 />}
			{!pending && isLiked && likedIcon}
			{!pending && !isLiked && notLikedIcon}
		</Button>
	);
};

export default LikeSongButton;
