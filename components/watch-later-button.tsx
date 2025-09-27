import React from "react";
import { ListMusicIcon } from "lucide-react";
import { addToWatchLater } from "@/actions/playlist-actions";

/**
 * Props for the WatchLaterButton component.
 */
interface WatchLaterButtonProps {
	/** ID of the song to add to watch later playlist */
	songID: number;
}

/**
 * Button component for adding songs to the "Watch Later" playlist.
 * Uses server action binding to handle playlist addition on form submission.
 *
 * @param props - Component props
 * @returns JSX element containing the watch later button form
 */
const WatchLaterButton = ({ songID }: WatchLaterButtonProps) => {
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
