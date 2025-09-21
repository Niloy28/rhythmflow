import LibraryView from "@/components/views/library-view";
import LikedSongView from "@/components/views/liked-song-view";

/**
 * Application home page displaying music discovery interface
 *
 * @returns JSX element with main music browsing components
 *
 * @remarks
 * This page serves as the primary entry point for music discovery and playback.
 * It combines two main views:
 *
 * **LikedSongView**: Displays recently liked songs or popular tracks,
 * providing quick access to user preferences and trending content.
 *
 * **LibraryView**: Shows the complete music library with browsing
 * capabilities for artists, albums, and songs.
 */
export default function Home() {
	return (
		<>
			<LikedSongView />
			<LibraryView />
		</>
	);
}
