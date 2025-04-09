import ThemeToggle from "@/components/theme-toggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";

const SettingsPage = () => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Settings</CardTitle>
				<CardDescription>
					Personalize your experience from this page
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ThemeToggle />
			</CardContent>
		</Card>
	);
};

export default SettingsPage;
