"use client";

import { AlbumArtContext } from "@/context/album-art-context";
import { useState } from "react";

const AlbumArtProvider = ({
	children,
	currentAlbumArt,
}: {
	children: React.ReactNode;
	currentAlbumArt?: string;
}) => {
	const [albumArt, setAlbumArt] = useState(currentAlbumArt ?? "");

	return (
		<AlbumArtContext.Provider value={{ albumArt, setAlbumArt }}>
			{children}
		</AlbumArtContext.Provider>
	);
};

export default AlbumArtProvider;
