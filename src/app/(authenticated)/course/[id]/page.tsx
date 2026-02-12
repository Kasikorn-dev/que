import { notFound } from "next/navigation";
import { CourseDetail } from "@/features/course";
import { HydrateClient, serverCaller } from "@/trpc/server";

interface CoursePageProps {
	params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
	const { id } = await params;
	const courseId = Number.parseInt(id);

	if (Number.isNaN(courseId)) {
		notFound();
	}

	// Prefetch course data
	try {
		void serverCaller.course.getById.prefetch({ id: courseId });
	} catch {
		notFound();
	}

	return (
		<HydrateClient>
			<CourseDetail courseId={courseId} />
		</HydrateClient>
	);
}
