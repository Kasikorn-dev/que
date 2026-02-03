import { serverCaller, HydrateClient } from "@/trpc/server";
import { CourseView } from "@/features/course";
import { notFound } from "next/navigation";

export default async function CoursePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const courseId = Number.parseInt(id);

	if (Number.isNaN(courseId)) {
		notFound();
	}

	void serverCaller.course.getById.prefetch({ id: courseId });

	return (
		<HydrateClient>
			<div className="container py-8">
				<CourseView id={courseId} />
			</div>
		</HydrateClient>
	);
}
