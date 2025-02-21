import { deleteAlbum } from "@/actions/admin/album-actions";
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

const AlbumDeletePage = async ({
	params,
}: {
	params: Promise<{ id: number }>;
}) => {
	const id = (await params).id;
	const album = await db
		.selectFrom("albums")
		.selectAll()
		.where("id", "=", id)
		.executeTakeFirst();

	if (!album) {
		redirect("/dashboard/albums");
	}

	return (
		<Card className="m-auto mt-4 pt-4 flex flex-col w-[24rem]">
			<CardHeader>
				<CardTitle>Delete Album</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>
					<p>
						Are you sure you want to delete <b>{album.name}?</b>
					</p>
					<b className="text-red-400">This action cannot be undone</b>
				</CardDescription>
				<form
					action={deleteAlbum}
					className="flex gap-2 justify-center items-center p-2 mt-4"
				>
					<Input name="id" value={album.id!} type="hidden" />
					<Input name="image_src" value={album.image_src!} type="hidden" />
					<DeleteButton />
					<Link href={`dashboard/albums/${album.id}`}>
						<Button>Cancel</Button>
					</Link>
				</form>
			</CardContent>
			<CardFooter>
				<BackLink target="albums" />
			</CardFooter>
		</Card>
	);
};

export default AlbumDeletePage;
