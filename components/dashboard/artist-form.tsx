"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { artistSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

type ArtistDataType = {
	id: number | null;
	name: string;
	image_src: string;
};

const ArtistForm = ({
	title,
	artist,
	action,
}: {
	title: string;
	artist?: ArtistDataType;
	action: (formData: FormData) => Promise<void>;
}) => {
	const [imageUrl, setImageUrl] = useState<string>(artist?.image_src || "");
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<z.infer<typeof artistSchema>>({
		resolver: zodResolver(artistSchema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof artistSchema>> = async (
		data
	) => {
		const formData = new FormData();
		formData.append("id", artist?.id?.toString() || "");
		formData.append("name", data.name);
		formData.append("image", data.image[0]);
		formData.append("old_image_src", artist?.image_src || "");

		try {
			await action(formData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card className="flex flex-col m-6 p-2 w-2/3">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col justify-center items-center gap-2"
				>
					<Input id="id" value={artist?.id || ""} type="hidden" />
					<Input
						{...register("name")}
						type="text"
						id="name"
						defaultValue={artist ? artist.name : ""}
					/>
					{errors.name && (
						<span className="text-red-500">{errors.name.message}</span>
					)}
					<Input
						{...register("image")}
						type="file"
						id="image"
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
					{errors.image && (
						<span className="text-red-500">{errors.image.message}</span>
					)}

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default ArtistForm;
