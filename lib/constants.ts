import NavigationItem from "@/types/navigation-item";
import {
	CogIcon,
	HeartIcon,
	HomeIcon,
	ListMusicIcon,
	MusicIcon,
} from "lucide-react";

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
		url: "/liked-music",
		icon: HeartIcon,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: CogIcon,
	},
];

export const imageTypes = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];
