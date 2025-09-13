import React from "react";
import { ListMusicIcon } from "lucide-react";
import { addToWatchLater } from "@/actions/playlist-actions";

const WatchLaterButton = ({ songID }: { songID: number }) => {
	const boundAddToWatchLater = addToWatchLater.bind(null, songID);

	return (
		<form action={boundAddToWatchLater} className="w-full">
			<button
				className="w-full hover:cursor-pointer flex gap-1 justify-between items-center"
				type="submit"
			>
				Watch Later <ListMusicIcon />
			</button>
		</form>
	);
};

export default WatchLaterButton;
