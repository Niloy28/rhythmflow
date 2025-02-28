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
