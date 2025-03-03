import LibraryView from "@/components/library-view";
import LikedSongView from "@/components/liked-song-view";

export default function Home() {
	return (
		<>
			<LikedSongView />
			<LibraryView />
		</>
	);
}
