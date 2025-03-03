import LibraryView from "@/components/views/library-view";
import LikedSongView from "@/components/views/liked-song-view";

export default function Home() {
	return (
		<>
			<LikedSongView />
			<LibraryView />
		</>
	);
}
