import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-border bg-background">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
				{/* Logo & Copyright */}
				<div className="flex flex-col items-center gap-1 sm:items-start">
					<Link href="/" className="text-lg font-semibold text-foreground">
						Que
					</Link>
					<p className="text-sm text-muted-foreground">
						© {currentYear} AIO. All rights reserved.
					</p>
				</div>

				{/* Links */}
				<div className="flex gap-6 text-sm text-muted-foreground">
					<Link
						href="/privacy"
						className="transition-colors hover:text-foreground"
					>
						Privacy
					</Link>
					<Link
						href="/terms"
						className="transition-colors hover:text-foreground"
					>
						Terms
					</Link>
					<Link
						href="/contact"
						className="transition-colors hover:text-foreground"
					>
						Contact
					</Link>
				</div>
			</div>
		</footer>
	);
}
