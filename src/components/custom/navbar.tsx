"use client";

import type { User } from "@supabase/supabase-js";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { UserNav } from "@/components/custom/user-nav";
import { Button } from "@/components/ui/button";

interface NavbarProps {
	user: User | null;
}

export function Navbar({ user }: NavbarProps) {
	return (
		<header className="sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur">
			<nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
				{/* Logo */}
				<Link
					className="font-semibold text-foreground text-xl"
					href={user ? "/dashboard" : "/"}
				>
					Que
				</Link>

				{/* Right side */}
				<div className="flex items-center gap-2">
					{!user && <ModeToggle />}
					{user ? (
						<>
							<Button
								asChild
								className="h-10 w-10 rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
								size="icon"
								variant="ghost"
							>
								<Link href="/create">
									<Plus className="h-5 w-5" />
									<span className="sr-only">Create</span>
								</Link>
							</Button>
							<UserNav user={user} />
						</>
					) : (
						<>
							<Button asChild size="sm" variant="ghost">
								<Link href="/signin">Sign In</Link>
							</Button>
							<Button asChild size="sm">
								<Link href="/signup">Get Started</Link>
							</Button>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
