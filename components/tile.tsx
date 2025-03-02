import Image from "next/image";
import React from "react";

const Tile = ({ image, onClick }: { image: string; onClick: () => void }) => {
	return (
		<div className="m-2 w-24 h-24 hover:cursor-pointer" onClick={onClick}>
			<Image
				src={image}
				alt=""
				width={96}
				height={96}
				className="rounded-lg w-full h-full"
			/>
		</div>
	);
};

export default Tile;
