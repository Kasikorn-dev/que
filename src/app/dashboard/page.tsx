import { DashboardContent } from "@/features/dashboard";
import { serverCaller } from "@/trpc/server";
export default async function DashboardPage() {
	// change this to use prefetch
	await serverCaller.post.hello.prefetch({ text: "world1" });

	return (
		<main className="mx-auto min-h-[calc(100vh-8rem)] max-w-5xl px-4 py-8">
			<DashboardContent />
		</main>
	);
}
