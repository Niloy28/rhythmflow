"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import Image from "next/image";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import SubmitButton from "./submit-button";

type SongDataType = {
	id: number | null;
	year: number;
	album_id: number;
	name: string;
	image_src: string;
};

const SongForm = ({
	title,
	song,
	action,
	albums,
}: {
	title: string;
	song?: SongDataType;
	action: (formData: FormData) => Promise<void>;
	albums: { id: number; name: string }[];
}) => {
	const [imageUrl, setImageUrl] = useState<string>(song?.image_src || "");

	return (
		<Card className="flex flex-col m-6 p-2 w-2/3">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					action={action}
					className="flex flex-col justify-center items-center gap-2"
				>
					<Input name="id" value={song?.id || ""} type="hidden" />
					<Input type="text" name="name" defaultValue={song ? song.name : ""} />

					<Input
						name="image"
						type="file"
						accept="image/*"
						onChange={(e) => {
							if (e.target.files) {
								const file = e.target.files[0];

								if (file) {
									setImageUrl(URL.createObjectURL(file));
								}
							}
						}}
					/>
					{imageUrl.length > 0 && (
						<>
							<div className="m-auto p-2 mt-2">
								<Image src={imageUrl} alt="" width={400} height={400} />
							</div>
						</>
					)}

					<Select
						name="album_id"
						defaultValue={song?.album_id.toString() ?? undefined}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select an album" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Albums</SelectLabel>
								{albums.map((album) => (
									<SelectItem key={album.id} value={album.id.toString()}>
										{album.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>

					<Input
						name="year"
						type="number"
						min={1900}
						max={2099}
						defaultValue={song?.year}
					/>

					<SubmitButton />
				</form>
			</CardContent>
		</Card>
	);
};

export default SongForm;
