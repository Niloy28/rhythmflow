"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
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
	audio: string;
	duration: number;
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
	const [audioDuration, setAudioDuration] = useState<number>(
		song?.duration ?? 0
	);
	const audioRef = useRef<HTMLAudioElement>(null);
	const [audioURL, setAudioURL] = useState<string | undefined>(undefined);

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

					<Input type="hidden" value={song?.audio} name="old_audio" />
					<Input
						name="audio"
						type="file"
						accept="audio/*"
						onChange={(e) => {
							const file = e.target.files?.[0];

							if (!file) {
								return;
							}

							setAudioURL(URL.createObjectURL(file));
						}}
					/>

					<audio
						className="hidden"
						ref={audioRef}
						src={audioURL}
						preload="metadata"
						onLoadedMetadata={(_e) => {
							setAudioDuration(audioRef.current?.duration ?? 0);
						}}
					/>
					<Input type="hidden" value={audioDuration} name="duration" />

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
