"use client";

import { BookOpen } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/trpc/react";

export function CourseView({ id }: { id: number }) {
	const [course] = api.course.getById.useSuspenseQuery({ id });

	return (
		<div className="mx-auto max-w-4xl space-y-8 pb-10">
			{/* Course Header */}
			<div className="space-y-4">
				<h1 className="font-bold text-4xl tracking-tight">{course.title}</h1>
				<p className="text-muted-foreground text-xl">{course.description}</p>
			</div>

			{/* Lessons List */}
			<div className="space-y-4">
				<h2 className="flex items-center gap-2 font-semibold text-2xl">
					<BookOpen className="h-6 w-6" />
					Lessons
				</h2>
				<Accordion className="w-full" collapsible type="single">
					{course.lessons.map((lesson) => (
						<AccordionItem key={lesson.id} value={`item-${lesson.id}`}>
							<AccordionTrigger className="rounded-lg px-4 font-medium text-lg hover:bg-muted/50 hover:no-underline">
								{lesson.title}
							</AccordionTrigger>
							<AccordionContent className="space-y-6 px-4 pt-4 pb-6">
								{/* Lesson Content */}
								<div className="prose dark:prose-invert max-w-none">
									{/* Simple markdown rendering for now - can use a library later if needed */}
									<div className="whitespace-pre-wrap">{lesson.content}</div>
								</div>

								{/* Games in Lesson */}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	);
}
