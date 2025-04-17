"use client";

import { IsSongLikedContext } from "@/context/is-song-liked-context";
import { useState } from "react";

const IsSongLikedProvider = ({
	children,
	isCurrentlyLiked,
}: {
	children: React.ReactNode;
	isCurrentlyLiked: boolean;
}) => {
	const [isLiked, setIsLiked] = useState(isCurrentlyLiked ?? null);

	return (
		<IsSongLikedContext.Provider value={{ isLiked, setIsLiked }}>
			{children}
		</IsSongLikedContext.Provider>
	);
};

export default IsSongLikedProvider;
