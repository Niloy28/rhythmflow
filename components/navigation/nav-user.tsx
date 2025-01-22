"use client";

import React from "react";
import { Loader2, UserCircleIcon } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import UserDropdown from "./user-dropdown";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

const NavUser = () => {
	const { data: session, isPending } = authClient.useSession();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{isPending && (
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarFallback className="rounded-lg">
							<Loader2 className="animate-spin" />
						</AvatarFallback>
					</Avatar>
				)}
				{!isPending && session && session.user && (
					<UserDropdown user={session.user} />
				)}
				{(!session || !session.user) && !isPending && (
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Link
							href={"/signin"}
							className="w-full flex justify-between items-center"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarFallback className="rounded-lg">
									<UserCircleIcon />
								</AvatarFallback>
							</Avatar>

							<span className="truncate underline underline-offset-4">
								Sign In
							</span>
						</Link>
					</SidebarMenuButton>
				)}
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default NavUser;
