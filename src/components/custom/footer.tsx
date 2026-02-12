import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-border border-t bg-background">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
				{/* Logo & Copyright */}
				<div className="flex flex-col items-center gap-1 sm:items-start">
					<Link className="font-semibold text-foreground text-lg" href="/">
						Que
					</Link>
					<p className="text-muted-foreground text-sm">
						© {currentYear} Onelife. All rights reserved.
					</p>
				</div>

				{/* Links */}
				<div className="flex gap-6 text-muted-foreground text-sm">
					<Link
						className="transition-colors hover:text-foreground"
						href="/privacy"
					>
						Privacy
					</Link>
					<Link
						className="transition-colors hover:text-foreground"
						href="/terms"
					>
						Terms
					</Link>
					<Link
						className="transition-colors hover:text-foreground"
						href="/contact"
					>
						Contact
					</Link>
				</div>
			</div>
		</footer>
	);
}
