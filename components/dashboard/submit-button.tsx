"use client";

import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

/**
 * Submit button component with loading state management.
 * Shows spinner during form submission and disables interaction.
 *
 * @returns JSX element containing the submit button with loading state
 */
const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending}>
			{pending ? <Loader2 className="animate-spin" /> : "Submit"}
		</Button>
	);
};

export default SubmitButton;
