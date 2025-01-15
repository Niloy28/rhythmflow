import React from "react";
import Image from "next/image";
import LogoImage from "../public/logo.png";

const Logo = () => {
	return (
		<span className="flex items-center justify-center">
			<Image src={LogoImage} alt="Shop logo" width={50} height={50} />
		</span>
	);
};

export default Logo;
