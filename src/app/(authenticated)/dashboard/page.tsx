import { DashboardContent } from "@/features/dashboard";
import { HydrateClient, serverCaller } from "@/trpc/server";

export default async function DashboardPage() {
	// Prefetch courses
	void serverCaller.course.getAll.prefetch();

	return (
		<HydrateClient>
			<DashboardContent />
		</HydrateClient>
	);
}
