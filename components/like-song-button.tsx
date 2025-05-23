"use client";

import { likeSong, removeSongLike } from "@/actions/playlist-actions";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useAudioBarDispatchContext } from "@/hooks/use-audio-bar-dispatch-context";
import { useAudioBarContext } from "@/hooks/use-audio-bar-context";
import { setLikedSongCookie } from "@/lib/server-utils";

const LikeSongButton = ({
	songID,
	isLikedInitially,
	updateParentUILikeState,
}: {
	songID: number | null;
	isLikedInitially: boolean;
	updateParentUILikeState?: (isLiked: boolean) => void;
}) => {
	const [isLiked, setIsLiked] = useState(isLikedInitially);
	const audioBar = useAudioBarContext();
	const audioBarDispatch = useAudioBarDispatchContext();
	const { pending } = useFormStatus();

	const likedIcon = <Heart fill="red" color="red" />;
	const notLikedIcon = <Heart />;

	useEffect(() => {
		setIsLiked(isLikedInitially);
	}, [isLikedInitially]);

	useEffect(() => {
		if (audioBar.songID === songID?.toString()) {
			audioBarDispatch({
				type: "SET_IS_LIKED",
				payload: isLiked,
			});
		}
	}, [isLiked, audioBar.songID, audioBarDispatch, songID]);

	useEffect(() => {
		// set cookie if clicked from audio bar
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
		>
			{pending && <Loader2 />}
			{!pending && isLiked && likedIcon}
			{!pending && !isLiked && notLikedIcon}
		</Button>
	);
};

export default LikeSongButton;
