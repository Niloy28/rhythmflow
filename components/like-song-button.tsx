"use client";

import { likeSong, removeSongLike } from "@/actions/playlist-actions";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";

const LikeSongButton = ({
	songID,
	isLikedInitially,
}: {
	songID: number | null;
	isLikedInitially: boolean;
}) => {
	if (!songID) {
		throw new Error("songID can never be null");
	}
	const [isLiked, setIsLiked] = useState(isLikedInitially);
	const { pending } = useFormStatus();

	const likedIcon = <Heart fill="red" color="red" />;
	const notLikedIcon = <Heart />;

	let likeStatusIcon = isLiked ? likedIcon : notLikedIcon;

	return (
		<form
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();

				const formData = new FormData();
				formData.set("song_id", songID.toString());

				if (isLiked) {
					removeSongLike(formData);
					likeStatusIcon = notLikedIcon;
					setIsLiked(false);
				} else {
					likeSong(formData);
					likeStatusIcon = likedIcon;
					setIsLiked(true);
				}
			}}
		>
			<input type="hidden" value={songID} name="song_id" />
			<Button variant="outline">
				{pending && <Loader2 />}
				{!pending && likeStatusIcon}
			</Button>
		</form>
	);
};

export default LikeSongButton;
