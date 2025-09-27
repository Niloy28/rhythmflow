"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

/**
 * Delete button component with loading state management.
 * Shows spinner during form submission and disables interaction.
 *
 * @returns JSX element containing the delete button with loading state
 */
const DeleteButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} variant="destructive">
			{pending ? <Loader2 className="animate-spin" /> : "Delete"}
		</Button>
	);
};

export default DeleteButton;
