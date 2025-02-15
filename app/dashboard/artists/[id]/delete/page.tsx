import { deleteArtist } from "@/actions/admin/artist-actions";
import BackLink from "@/components/dashboard/back-link";
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
					<Input name="artist-id" value={artist.id!} type="hidden" />
					<Button variant="destructive">Delete</Button>
					<Link href={`dashboard/artist/${artist.id}`}>
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
