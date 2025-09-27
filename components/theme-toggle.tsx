"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeFirstLetter } from "@/lib/utils";

/**
 * Theme toggle component that allows users to switch between light, dark, and system themes.
 * Uses next-themes for theme management and displays current theme selection.
 *
 * @returns JSX element containing the theme selector dropdown
 */
const ThemeToggle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<div className="flex justify-between">
			<p>Theme: </p>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="default" className="flex gap-4">
						<p className="rotate-0 scale-100 transition-all">
							{capitalizeFirstLetter(theme!)}
						</p>
						<ChevronDown />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setTheme("light")}>
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ThemeToggle;
