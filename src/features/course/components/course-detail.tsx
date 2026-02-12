"use client";

import { api } from "@/trpc/react";
import { CourseHeader } from "./course-header";
import { LessonPath } from "./lesson-path";

interface CourseDetailProps {
	courseId: number;
}

export function CourseDetail({ courseId }: CourseDetailProps) {
	const [course] = api.course.getById.useSuspenseQuery({ id: courseId });

	return (
		<main className="mx-auto min-h-[calc(100vh-8rem)] max-w-5xl px-4 py-8">
			<div className="space-y-8">
				{/* Course Header */}
				<CourseHeader course={course} />

				{/* Lesson Path */}
				<div className="rounded-lg border border-border bg-card p-6">
					<h2 className="mb-6 font-semibold text-xl">All Lessons</h2>
					<LessonPath lessons={course.lessons} />
				</div>
			</div>
		</main>
	);
}
