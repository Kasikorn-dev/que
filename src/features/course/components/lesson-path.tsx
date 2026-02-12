"use client";

import { BookOpen } from "lucide-react";
import { useState } from "react";
import type { RouterOutputs } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { LessonModal } from "./lesson-modal";

type Lesson = RouterOutputs["course"]["getById"]["lessons"][number];

interface LessonPathProps {
	lessons: Lesson[];
}

export function LessonPath({ lessons }: LessonPathProps) {
	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

	return (
		<>
			<div className="relative flex flex-col gap-8 py-8">
				{/* Vertical line connecting lessons */}
				<div className="absolute top-0 left-8 h-full w-0.5 bg-border" />

				{lessons.map((lesson, index) => (
					<div className="relative flex items-start gap-4" key={lesson.id}>
						{/* Lesson circle with Tooltip */}
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className="group relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl"
									onClick={() => setSelectedLesson(lesson)}
									type="button"
								>
									<BookOpen className="size-6" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" className="max-w-xs">
								<h3 className="font-semibold">{lesson.title}</h3>
								{lesson.description && (
									<p className="mt-1 text-muted-foreground text-sm">
										{lesson.description}
									</p>
								)}
							</TooltipContent>
						</Tooltip>

						{/* Lesson info */}
						<div className="flex-1 pt-3">
							<div className="text-muted-foreground text-sm">
								Lesson {index + 1}
							</div>
							<h3 className="font-medium">{lesson.title}</h3>
						</div>
					</div>
				))}
			</div>

			{/* Lesson Modal */}
			{selectedLesson && (
				<LessonModal
					isOpen={!!selectedLesson}
					lesson={selectedLesson}
					onClose={() => setSelectedLesson(null)}
				/>
			)}
		</>
	);
}
