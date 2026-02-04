import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider, Navbar, Footer } from "@/components/custom";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { env } from "process";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Que - Learn Smarter",
	description:
		"A learner-first adaptive platform that transforms any input into active knowledge.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	console.log(env.SUPABASE_DB_URL);

	const supabase = await createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<html className={cn(inter.variable)} lang="en" suppressHydrationWarning>
			<body className="flex min-h-screen flex-col">
				<TRPCReactProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar user={user} />
						<div className="flex-1">{children}</div>
						<Footer />
						<Toaster />
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
