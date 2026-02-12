"use client";

import type { User } from "@supabase/supabase-js";
import { Check, Laptop, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signout } from "../../features/auth/actions";

interface UserNavProps {
	user: User;
}

export function UserNav({ user }: UserNavProps) {
	const { theme, setTheme } = useTheme();
	const avatarUrl = user.user_metadata.avatar_url;
	const name = user.user_metadata.name || user.email?.split("@")[0] || "User";
	const email = user.email;
	const initials = name
		.split(" ")
		.map((n: string) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	function handleSignOut() {
		signout();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="relative h-8 w-8 rounded-full" variant="ghost">
					<Avatar className="h-8 w-8">
						<AvatarImage alt={name} src={avatarUrl} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="font-medium text-sm leading-none">{name}</p>
						<p className="text-muted-foreground text-xs leading-none">
							{email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					{/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem onClick={() => setTheme("light")}>
								<Sun className="mr-2 h-4 w-4" />
								<span>Light</span>
								{theme === "light" && <Check className="ml-auto h-4 w-4" />}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								<Moon className="mr-2 h-4 w-4" />
								<span>Dark</span>
								{theme === "dark" && <Check className="ml-auto h-4 w-4" />}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								<Laptop className="mr-2 h-4 w-4" />
								<span>System</span>
								{theme === "system" && <Check className="ml-auto h-4 w-4" />}
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/contact">Contact</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/privacy">Privacy</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/terms">Terms</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
