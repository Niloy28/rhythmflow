"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { artistSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArtist } from "@/actions/admin/artist-actions";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const ArtistForm = ({ title }: { title: string }) => {
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
		formData.append("name", data.name);
		formData.append("image", data.image[0]);

		try {
			await createArtist(formData);
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
					action={createArtist}
					className="flex flex-col justify-center items-center gap-2"
				>
					<Input {...register("name")} type="text" id="name" />
					{errors.name && (
						<span className="text-red-500">{errors.name.message}</span>
					)}
					<Input
						{...register("image")}
						type="file"
						id="image"
						accept="image/*"
					/>
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
