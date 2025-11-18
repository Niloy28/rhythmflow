import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/app-sidebar";
import AudioBar from "@/components/audio-bar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import JotaiProvider from "@/components/providers/jotai-provider";
import { getAuduioBarCookies } from "@/lib/server-utils";

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
	const defaultAudioBarCookies = await getAuduioBarCookies();

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<JotaiProvider atomValues={defaultAudioBarCookies}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SidebarProvider defaultOpen={false}>
							<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
								<AppSidebar />
								<SidebarTrigger />
							</header>
							<main className="w-full pb-16">
								<div className="flex flex-col items-center justify-items-center p-8 pb-40 gap-4 sm:p-8 font-[family-name:var(--font-geist-sans)] overflow-y-auto">
									{children}
									<AudioBar />
								</div>
							</main>
							<Toaster />
						</SidebarProvider>
					</ThemeProvider>
				</JotaiProvider>
			</body>
		</html>
	);
}
