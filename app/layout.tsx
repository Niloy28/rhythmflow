import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import AudioProvider from "@/provider/audio-provider";
import AlbumArtProvider from "@/provider/album-art-provider";
import AudioBar from "@/components/audio-bar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "RhythmFlow",
	description: "An app to listen to free music",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const currentlyListening = (await cookies()).get("currentlyListening")?.value;
	const currentAlbumArt = (await cookies()).get("currentAlbumArt")?.value;

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AlbumArtProvider currentAlbumArt={currentAlbumArt ?? ""}>
					<AudioProvider currentAudio={currentlyListening ?? ""}>
						<SidebarProvider defaultOpen={false} className="pb-16">
							<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
								<AppSidebar />
								<SidebarTrigger />
							</header>
							<main className="w-full">
								<div className="flex flex-col items-center justify-items-center p-8 pb-40 gap-4 sm:p-8 font-[family-name:var(--font-geist-sans)] overflow-y-auto">
									{children}
								</div>
								<AudioBar />
							</main>
							<Toaster />
						</SidebarProvider>
					</AudioProvider>
				</AlbumArtProvider>
			</body>
		</html>
	);
}
