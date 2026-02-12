import { formatDistanceToNow } from "date-fns";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { RouterOutputs } from "@/trpc/react";

type Course = RouterOutputs["course"]["getAll"][number];

interface CourseCardProps {
	course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
	return (
		<Link href={`/course/${course.id}`}>
			<Card className="transition-all hover:shadow-lg">
				<CardHeader>
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<CardTitle className="line-clamp-2">{course.title}</CardTitle>
							{course.description && (
								<CardDescription className="mt-2 line-clamp-2">
									{course.description}
								</CardDescription>
							)}
						</div>
						<div className="shrink-0 rounded-full bg-primary/10 p-3">
							<BookOpen className="size-5 text-primary" />
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-4 text-muted-foreground text-sm">
						<div className="flex items-center gap-1">
							<BookOpen className="size-4" />
							<span>{course.lessons.length} lessons</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="size-4" />
							<span>
								{formatDistanceToNow(new Date(course.createdAt), {
									addSuffix: true,
								})}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
