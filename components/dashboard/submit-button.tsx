import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending}>
			{pending ? <Loader2 className="animate-spin" /> : "Submit"}
		</Button>
	);
};

export default SubmitButton;
