import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import AudioBar from "@/components/audio-bar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AudioBarProvider from "@/components/providers/audio-bar-provider";

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
	const currentSongID = (await cookies()).get("currentSongID")?.value;
	const currentSongName = (await cookies()).get("currentSongName")?.value;
	const currentArtist = (await cookies()).get("currentArtist")?.value;
	const currentAlbum = (await cookies()).get("currentAlbum")?.value;
	const currentYear = (await cookies()).get("currentYear")?.value;
	const currentlyAudioSrc = (await cookies()).get("currentAudioSrc")?.value;
	const currentAlbumArt = (await cookies()).get("currentAlbumArt")?.value;
	const isCurrentlyLiked = (await cookies()).get("isCurrentlyLiked")?.value;

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AudioBarProvider
						currentSongID={currentSongID}
						currentSongName={currentSongName}
						currentArtist={currentArtist}
						currentAlbum={currentAlbum}
						currentYear={currentYear}
						currentAlbumArt={currentAlbumArt}
						currentAudioSrc={currentlyAudioSrc}
						isCurrentlyLiked={isCurrentlyLiked === "true"}
					>
						<SidebarProvider defaultOpen={false} className="pb-16">
							<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
								<AppSidebar />
								<SidebarTrigger />
							</header>
							<main className="w-full">
								<div className="flex flex-col items-center justify-items-center p-8 pb-40 gap-4 sm:p-8 font-[family-name:var(--font-geist-sans)] overflow-y-auto">
									{children}
									<AudioBar />
								</div>
							</main>
							<Toaster />
						</SidebarProvider>
					</AudioBarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
