"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { CourseCard } from "./course-card";

export function DashboardContent() {
	const [courses] = api.course.getAll.useSuspenseQuery();

	if (courses.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center rounded-lg p-8 text-center">
				<div className="mx-auto flex max-w-md flex-col items-center gap-4">
					<div className="rounded-full bg-primary/10 p-4">
						<Plus className="size-8 text-primary" />
					</div>
					<h3 className="font-semibold text-xl">No courses yet</h3>
					<p className="text-muted-foreground">
						Start creating your first AI-powered course now!
					</p>
					<Button asChild size="lg">
						<Link href="/create">
							<Plus className="mr-2 size-4" />
							Create Course
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="font-bold text-2xl">My Courses</h2>
					<p className="text-muted-foreground">
						{courses.length} {courses.length === 1 ? "course" : "courses"}
					</p>
				</div>
				<Button asChild>
					<Link href="/create">
						<Plus className="mr-2 size-4" />
						Create Course
					</Link>
				</Button>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{courses.map((course) => (
					<CourseCard course={course} key={course.id} />
				))}
			</div>
		</div>
	);
}
