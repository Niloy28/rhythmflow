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
import { Ellipsis, ListMusicIcon, PlusIcon } from "lucide-react";

const PlaylistMenu = ({
	className,
	onPlaylistMenuOpen,
}: {
	className?: string;
	onPlaylistMenuOpen: (open: boolean) => void;
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
				<DropdownMenuItem className="hover:cursor-pointer flex gap-1 justify-between">
					Watch Later <ListMusicIcon />
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
