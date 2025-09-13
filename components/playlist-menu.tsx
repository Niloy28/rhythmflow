import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Ellipsis, PlusIcon } from "lucide-react";
import WatchLaterButton from "./watch-later-button";

const PlaylistMenu = ({
	songID,
	className,
	onPlaylistMenuOpen,
}: {
	songID: number;
	onPlaylistMenuOpen: (open: boolean) => void;
	className?: string;
}) => {
	// TODO: Fetch user playlists and populate the menu dynamically
	return (
		<DropdownMenu onOpenChange={onPlaylistMenuOpen}>
			<DropdownMenuTrigger
				className={cn(
					"flex justify-center items-center bg-background rounded-lg",
					className
				)}
			>
				<Ellipsis />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Playlists</DropdownMenuLabel>
				<DropdownMenuItem>
					<WatchLaterButton songID={songID} />
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="hover:cursor-pointer flex gap-1 justify-between">
					Create New Playlist <PlusIcon />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default PlaylistMenu;
