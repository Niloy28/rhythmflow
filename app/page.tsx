import LibraryView from "@/components/library-view";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
			<LibraryView />
		</div>
	);
}
