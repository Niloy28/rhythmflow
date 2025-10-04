"use client";

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
import { Ellipsis, Loader2, PlusIcon } from "lucide-react";
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
import { createPlaylist } from "@/actions/playlist-actions";

/**
 * Props for the PlaylistMenu component.
 */
interface PlaylistMenuProps {
	/** ID of the song to add to playlists */
	songID: number;
	/** Callback fired when the playlist menu opens/closes */
	onPlaylistMenuOpen: (open: boolean) => void;
	/** Additional CSS classes to apply to the trigger button */
	className?: string;
}

/**
 * Dropdown menu component for managing playlists and creating new ones.
 * Provides options to add songs to existing playlists or create new playlists.
 *
 * @param props - Component props
 * @returns JSX element containing the playlist menu
 */
const PlaylistMenu = ({
	songID,
	className,
	onPlaylistMenuOpen,
}: PlaylistMenuProps) => {
	// TODO: Fetch user playlists and populate the menu dynamically
	const [open, setOpen] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	return (
		// Wrap in Dialog for "Create New Playlist" functionality
		<Dialog open={open} onOpenChange={setOpen}>
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
					<Button
						disabled={isSubmitting}
						onClick={() => {
							const playlistName = (
								document.getElementById("playlist-name") as HTMLInputElement
							).value;

							setIsSubmitting(true);
							createPlaylist(playlistName).then(() => {
								setOpen(false);
								setIsSubmitting(false);
							});
						}}
					>
						{isSubmitting ? <Loader2 className="animate-spin" /> : "Create"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PlaylistMenu;
