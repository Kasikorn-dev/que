"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { UserNav } from "@/components/custom/user-nav";

import type { User } from "@supabase/supabase-js";

interface NavbarProps {
	user: User | null;
}

export function Navbar({ user }: NavbarProps) {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
			<nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
				{/* Logo */}
				<Link href="/" className="text-xl font-semibold text-foreground">
					Que
				</Link>

				{/* Right side */}
				<div className="flex items-center gap-2">
					{!user && <ModeToggle />}
					{user ? (
						<>
							<Button
								variant="ghost"
								size="icon"
								asChild
								className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
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
							<Button variant="ghost" size="sm" asChild>
								<Link href="/signin">Sign In</Link>
							</Button>
							<Button size="sm" asChild>
								<Link href="/signup">Get Started</Link>
							</Button>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
