"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme provider component that wraps the next-themes ThemeProvider.
 * Enables theme switching functionality across the application.
 *
 * @param props - Component props (children and NextThemesProvider props)
 * @returns JSX element providing theme context to children
 */
export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
