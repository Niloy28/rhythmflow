import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackLink = ({ target }: { target: string }) => {
	return (
		<Link
			className="mt-4 flex gap-2 hover:cursor-pointer underline underline-offset-1"
			href={`/dashboard/${target}`}
		>
			<ArrowLeft /> <p>Back to {target}</p>
		</Link>
	);
};

export default BackLink;
