import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "../ui/sidebar";
import { NavigationItems } from "@/lib/constants";
import Link from "next/link";
import Logo from "../logo";
import NavUser from "./nav-user";

/**
 * Main application sidebar component with collapsible functionality.
 * Contains navigation menu, logo, and user authentication section.
 * Renders navigation items from constants and includes user dropdown.
 *
 * @returns JSX element containing the complete sidebar layout
 */
const AppSidebar = async () => {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Logo />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>RhythmFlow</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{NavigationItems.map((item, index) => (
								<SidebarMenuItem key={index}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};

export default AppSidebar;
