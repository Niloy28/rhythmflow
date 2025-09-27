import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Main dashboard landing page for content administration
 *
 * @returns JSX element with dashboard navigation menu
 *
 * @remarks
 * This page serves as the central hub for content management operations.
 * It provides navigation links to all administrative sections:
 * - Artists management
 * - Albums management
 * - Songs management
 *
 * **Security Note**: This dashboard is restricted to development environment
 * only and will redirect to the home page in production. This prevents
 * unauthorized access to administrative functions in deployed environments.
 *
 * The page uses a simple card layout with bullet-pointed navigation
 * links for easy access to different management sections.
 */
const DashboardPage = async () => {
	const env = process.env.NODE_ENV;

	// Restrict dashboard access to development environment only
	if (env !== "development") {
		redirect("/");
	}

	return (
		<Card className="m-6 p-2 flex flex-col justify-center items-center">
			<CardHeader>
				<CardTitle>Dashboard</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="list-disc">
					<li className="list-item">
						<Link
							className="text-blue-500 hover:cursor-pointer underline"
							href="/dashboard/artists"
						>
							Artists
						</Link>
					</li>
					<li className="list-item">
						<Link
							className="text-blue-500 hover:cursor-pointer underline"
							href="/dashboard/albums"
						>
							Albums
						</Link>
					</li>
					<li className="list-item">
						<Link
							className="text-blue-500 hover:cursor-pointer underline"
							href="/dashboard/songs"
						>
							Songs
						</Link>
					</li>
				</ul>
			</CardContent>
		</Card>
	);
};

export default DashboardPage;
