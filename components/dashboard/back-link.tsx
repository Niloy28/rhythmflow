import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

/**
 * Props for the BackLink component.
 */
interface BackLinkProps {
	/** Target path segment for the dashboard route */
	target: string;
	/** Display name for the link (defaults to target if not provided) */
	name?: string;
}

/**
 * Navigation link component for returning to dashboard sections.
 * Renders a styled back link with arrow icon and descriptive text.
 *
 * @param props - Component props
 * @returns JSX element containing the back navigation link
 */
const BackLink = ({ target, name }: BackLinkProps) => {
	return (
		<Link
			className="mt-4 flex gap-2 hover:cursor-pointer underline underline-offset-1"
			href={`/dashboard/${target}`}
		>
			<ArrowLeft /> <p>Back to {name ?? target}</p>
		</Link>
	);
};

export default BackLink;
