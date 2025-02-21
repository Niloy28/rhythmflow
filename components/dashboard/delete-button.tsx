"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const DeleteButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} variant="destructive">
			{pending ? <Loader2 className="animate-spin" /> : "Delete"}
		</Button>
	);
};

export default DeleteButton;
