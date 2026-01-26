import { DashboardContent } from "@/features/dashboard";
export default async function DashboardPage() {
	return (
		<main className="mx-auto min-h-[calc(100vh-8rem)] max-w-5xl px-4 py-8">
			<DashboardContent />
		</main>
	);
}
