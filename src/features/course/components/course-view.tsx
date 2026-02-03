"use client";

import { api } from "@/trpc/react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

export function CourseView({ id }: { id: number }) {
	const [course] = api.course.getById.useSuspenseQuery({ id });

	return (
		<div className="max-w-4xl mx-auto space-y-8 pb-10">
			{/* Course Header */}
			<div className="space-y-4">
				<h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
				<p className="text-xl text-muted-foreground">{course.description}</p>
			</div>

			{/* Lessons List */}
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold flex items-center gap-2">
					<BookOpen className="h-6 w-6" />
					Lessons
				</h2>
				<Accordion type="single" collapsible className="w-full">
					{course.lessons.map((lesson) => (
						<AccordionItem key={lesson.id} value={`item-${lesson.id}`}>
							<AccordionTrigger className="text-lg font-medium hover:no-underline hover:bg-muted/50 px-4 rounded-lg">
								{lesson.title}
							</AccordionTrigger>
							<AccordionContent className="px-4 pt-4 pb-6 space-y-6">
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
