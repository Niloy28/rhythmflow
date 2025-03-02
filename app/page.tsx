import LibraryView from "@/components/library-view";
import LikedSongView from "@/components/liked-song-view";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
			<LikedSongView />
			<LibraryView />
		</div>
	);
}
