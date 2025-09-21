import { deleteArtist } from "@/actions/admin/artist-actions";
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
 * Artist deletion confirmation page for dashboard administration
 *
 * @param params - Route parameters containing the artist ID to delete
 * @returns JSX element with artist deletion confirmation form
 *
 * @remarks
 * This page provides a destructive action confirmation interface for artist removal:
 * - Displays the artist name prominently for user verification
 * - Shows clear warning about the irreversible nature of deletion
 * - Includes hidden form fields with necessary data for the delete operation
 * - Provides cancel button to abort and return to artist details
 *
 * **Critical Operations**: The deletion process handles:
 * - Removing the artist record from the database
 * - Deleting associated profile image from R2 storage
 * - Cascading effects on related albums and songs (depending on database constraints)
 */
const ArtistDeletePage = async ({
	params,
}: {
	params: Promise<{ id: number }>;
}) => {
	const id = (await params).id;
	const artist = await db
		.selectFrom("artists")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	if (!artist) {
		redirect("/dashboard/artists");
	}

	return (
		<Card className="m-auto mt-4 pt-4 flex flex-col w-[24rem]">
			<CardHeader>
				<CardTitle>Delete Artist</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>
					<p>
						Are you sure you want to delete <b>{artist.name}?</b>
					</p>
					<b className="text-red-400">This action cannot be undone</b>
				</CardDescription>
				<form
					action={deleteArtist}
					className="flex gap-2 justify-center items-center p-2 mt-4"
				>
					{/* Hidden inputs for server action data */}
					<Input name="id" value={artist.id!} type="hidden" />
					<Input name="image_src" value={artist.image_src!} type="hidden" />
					<DeleteButton />
					<Link href={`dashboard/artists/${artist.id}`}>
						<Button>Cancel</Button>
					</Link>
				</form>
			</CardContent>
			<CardFooter>
				<BackLink target="artists" />
			</CardFooter>
		</Card>
	);
};

export default ArtistDeletePage;
