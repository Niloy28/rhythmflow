import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
	const env = process.env.NODE_ENV;

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
