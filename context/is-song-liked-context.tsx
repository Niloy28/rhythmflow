"use client";

import { createContext } from "react";

export const IsSongLikedContext = createContext({
	isLiked: false,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setIsLiked: (isLiked: boolean) => {},
});
