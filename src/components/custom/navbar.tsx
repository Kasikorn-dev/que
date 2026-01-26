"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { UserNav } from "@/features/auth/components/user-nav";

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
					<ModeToggle />
					{user ? (
						<UserNav user={user} />
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
