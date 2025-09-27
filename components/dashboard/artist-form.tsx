"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import Image from "next/image";
import SubmitButton from "./submit-button";
import { Label } from "../ui/label";

/**
 * Artist data structure used by the form.
 */
type ArtistDataType = {
	id: number | null;
	name: string;
	image_src: string;
};

/**
 * Props for the ArtistForm component.
 */
interface ArtistFormProps {
	/** Form title displayed in the card header */
	title: string;
	/** Artist data for editing (optional for creation) */
	artist?: ArtistDataType;
	/** Server action to handle form submission */
	action: (formData: FormData) => Promise<void>;
}

/**
 * Form component for creating and editing artist records.
 * Handles image upload with preview and file size validation.
 *
 * @param props - Component props
 * @returns JSX element containing the artist form
 */
const ArtistForm = ({ title, artist, action }: ArtistFormProps) => {
	const [imageUrl, setImageUrl] = useState<string>(artist?.image_src || "");

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
					<Input name="id" value={artist?.id || ""} type="hidden" />
					<Input
						type="text"
						name="name"
						defaultValue={artist ? artist.name : ""}
					/>

					<Label className="text-red-500 text-3xl font-bold mt-2 border-4 border-red-500 border-spacing-2">
						Image MUST BE UNDER 3MB
					</Label>
					<Input type="hidden" value={artist?.image_src} name="old_image" />
					<Input
						type="file"
						name="image"
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

					<SubmitButton />
				</form>
			</CardContent>
		</Card>
	);
};

export default ArtistForm;
