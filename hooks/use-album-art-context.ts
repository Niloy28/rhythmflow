"use client";

import { AlbumArtContext } from "@/context/album-art-context";
import { useContext } from "react";

export const useAlbumArtContext = () => {
	return useContext(AlbumArtContext);
};
