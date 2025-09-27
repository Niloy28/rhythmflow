import { deleteSong } from "@/actions/admin/song-actions";
import BackLink from "@/components/dashboard/back-link";
import DeleteButton from "@/components/dashboard/delete-button";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import db from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * Song deletion confirmation page for dashboard administration
 *
 * @param params - Route parameters containing the song ID to delete
 * @returns JSX element with song deletion confirmation form
 *
 * @remarks
 * This page provides a critical confirmation step before permanent song removal:
 * - Displays the song name clearly for administrator verification
 * - Shows prominent warning about the irreversible nature of the action
 * - Includes hidden form fields containing necessary deletion data
 * - Provides cancel option to abort and return to song details
 *
 * **Deletion Process**: Upon confirmation, the server action will:
 * - Remove the song record from the database
 * - Delete the associated audio file from R2 storage
 * - Clean up any related user interactions (likes, playlists)
 * - Redirect to songs dashboard with confirmation
 */
const SongDeletePage = async ({
	params,
}: {
	params: Promise<{ id: number }>;
}) => {
	const id = (await params).id;
	const song = await db
		.selectFrom("songs")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	if (!song) {
		redirect("/dashboard/songs");
	}

	return (
		<Card className="m-auto mt-4 pt-4 flex flex-col w-[24rem]">
			<CardHeader>
				<CardTitle>Delete Song</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>
					<p>
						Are you sure you want to delete <b>{song.name}?</b>
					</p>
					<b className="text-red-400">This action cannot be undone</b>
				</CardDescription>
				<form
					action={deleteSong}
					className="flex gap-2 justify-center items-center p-2 mt-4"
				>
					{/* Hidden inputs for server action */}
					<Input name="id" value={song.id!} type="hidden" />
					<Input name="audio" value={song.audio!} type="hidden" />
					<DeleteButton />
					<Link href={`dashboard/songs/${song.id}`}>
						<Button>Cancel</Button>
					</Link>
				</form>
			</CardContent>
			<CardFooter>
				<BackLink target="songs" />
			</CardFooter>
		</Card>
	);
};

export default SongDeletePage;
