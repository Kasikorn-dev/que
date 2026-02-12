import type { RouterOutputs } from "@/trpc/react";

type Course = RouterOutputs["course"]["getById"];

interface CourseHeaderProps {
	course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
	return (
		<div className="space-y-2">
			<h1 className="font-bold text-3xl">{course.title}</h1>
			{course.description && (
				<p className="text-lg text-muted-foreground">{course.description}</p>
			)}
			<div className="flex items-center gap-4 text-muted-foreground text-sm">
				<span>{course.lessons.length} lessons</span>
			</div>
		</div>
	);
}
