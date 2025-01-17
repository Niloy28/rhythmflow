import React from "react";
import { SidebarGroup, SidebarMenu } from "../ui/sidebar";
import NavigationItem from "@/types/navigation-item";

const NavMain = ({ items }: { items: NavigationItem[] }) => {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item, index) => (
					<div key={index}></div>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};

export default NavMain;
