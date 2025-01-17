import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const LibraryView = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-3xl font-bold">Library</CardTitle>
			</CardHeader>
			<CardContent>
				{/* Fetch and show recent songs */}
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sapiente
				facilis sint numquam a voluptatum dolorum quis, eos aperiam
				necessitatibus, repellendus minus labore id? Enim vero nemo iusto
				aspernatur laborum!
			</CardContent>
		</Card>
	);
};

export default LibraryView;
