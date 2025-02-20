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

type AlbumDataType = {
	id: number | null;
	year: number;
	artist_id: number;
	name: string;
	image_src: string;
};

const AlbumForm = ({
	title,
	album,
	action,
	artists,
}: {
	title: string;
	album?: AlbumDataType;
	action: (formData: FormData) => Promise<void>;
	artists: { id: number; name: string }[];
}) => {
	const [imageUrl, setImageUrl] = useState<string>(album?.image_src || "");

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
					<Input name="id" value={album?.id || ""} type="hidden" />
					<Input
						type="text"
						name="name"
						defaultValue={album ? album.name : ""}
					/>

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
						name="artist_id"
						defaultValue={album?.artist_id.toString() ?? undefined}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select an artist" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Artists</SelectLabel>
								{artists.map((artist) => (
									<SelectItem key={artist.id} value={artist.id.toString()}>
										{artist.name}
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
						defaultValue={album?.year}
					/>

					<SubmitButton />
				</form>
			</CardContent>
		</Card>
	);
};

export default AlbumForm;
