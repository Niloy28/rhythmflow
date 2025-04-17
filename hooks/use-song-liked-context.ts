"use client";

import { IsSongLikedContext } from "@/context/is-song-liked-context";
import { useContext } from "react";

export const useSongLikedContext = () => {
	return useContext(IsSongLikedContext);
};
