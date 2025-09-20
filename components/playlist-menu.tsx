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
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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
		// Wrap in Dialog for "Create New Playlist" functionality
		<Dialog>
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
					<DialogTrigger asChild>
						<DropdownMenuItem className="hover:cursor-pointer flex gap-1 justify-between">
							Create New Playlist <PlusIcon />
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Playlist creation dialog */}
			<form action="">
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Playlist</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="playlist-name">Name</Label>
							<Input
								id="playlist-name"
								name="playlist-name"
								defaultValue="New Playlist"
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Create</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};

export default PlaylistMenu;
