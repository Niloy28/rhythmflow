import React from "react";
import { SidebarGroup, SidebarMenu } from "../ui/sidebar";
import NavigationItem from "@/types/navigation-item";

/**
 * Props for the NavMain component.
 */
interface NavMainProps {
	/** Array of navigation items to render */
	items: NavigationItem[];
}

/**
 * Main navigation component for rendering sidebar menu items.
 * Currently renders empty divs as placeholder implementation.
 *
 * @param props - Component props containing navigation items
 * @returns JSX element containing the navigation menu structure
 */
const NavMain = ({ items }: NavMainProps) => {
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
