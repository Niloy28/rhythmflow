import ThemeToggle from "@/components/theme-toggle";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";

/**
 * User settings and preferences page
 *
 * @returns JSX element with user customization options
 *
 * @remarks
 * This page provides user preference controls for personalizing
 * the application experience. Currently includes:
 *
 * **Theme Toggle**: Allows users to switch between light, dark,
 * and system-based themes for optimal viewing preferences.
 */
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
