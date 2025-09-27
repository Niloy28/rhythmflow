import NavigationItem from "@/types/navigation-item";
import {
	CogIcon,
	HeartIcon,
	HomeIcon,
	ListMusicIcon,
	MusicIcon,
} from "lucide-react";

/**
 * Application navigation menu items configuration
 *
 * @remarks
 * Defines the main navigation structure for the music application,
 * including icons, titles, and URL paths for each section.
 */
export const NavigationItems: NavigationItem[] = [
	{
		title: "Home",
		url: "/",
		icon: HomeIcon,
	},
	{
		title: "Music",
		url: "/music",
		icon: MusicIcon,
	},
	{
		title: "Playlists",
		url: "/playlists",
		icon: ListMusicIcon,
	},
	{
		title: "Liked",
		url: "/liked",
		icon: HeartIcon,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: CogIcon,
	},
];

/**
 * Supported image MIME types for file uploads
 *
 * @remarks
 * Used for validating image uploads for artist profiles, album covers, etc.
 * Includes common web-safe image formats.
 */
export const imageTypes = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];
