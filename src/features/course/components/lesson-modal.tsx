"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { RouterOutputs } from "@/trpc/react";

type Lesson = RouterOutputs["course"]["getById"]["lessons"][number];

interface LessonModalProps {
	lesson: Lesson;
	isOpen: boolean;
	onClose: () => void;
}

export function LessonModal({ lesson, isOpen, onClose }: LessonModalProps) {
	// Process content: add line breaks for markdown syntax
	const processedContent = lesson.content
		? lesson.content
				// Add line breaks before headings
				.replace(/##\s/g, "\n\n## ")
				.replace(/#\s/g, "\n\n# ")
				// Add line breaks before lists
				.replace(/\*\s\s\s/g, "\n* ")
				// Add line breaks after sentences (period followed by capital letter)
				.replace(/\.\s+([A-Z])/g, ".\n\n$1")
				// Clean up multiple newlines
				.replace(/\n{3,}/g, "\n\n")
				.trim()
		: "";

	return (
		<Dialog onOpenChange={onClose} open={isOpen}>
			<DialogContent className="h-[90vh] w-[90vw] max-w-6xl overflow-hidden p-0 [&]:sm:max-w-6xl">
				<DialogHeader className="shrink-0 border-border border-b p-6">
					<DialogTitle className="text-2xl">{lesson.title}</DialogTitle>
					{lesson.description && (
						<p className="mt-2 text-muted-foreground text-sm">
							{lesson.description}
						</p>
					)}
				</DialogHeader>

				<div className="flex-1 overflow-y-auto p-6">
					<div className="prose prose-slate prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-li:leading-relaxed">
						<ReactMarkdown
							remarkPlugins={[remarkGfm, remarkBreaks]}
							rehypePlugins={[rehypeRaw]}
							components={{
								p: ({ children }) => <p className="mb-4">{children}</p>,
								h1: ({ children }) => (
									<h1 className="mb-4 mt-6 font-bold text-3xl">{children}</h1>
								),
								h2: ({ children }) => (
									<h2 className="mb-3 mt-5 font-bold text-2xl">{children}</h2>
								),
								h3: ({ children }) => (
									<h3 className="mb-2 mt-4 font-semibold text-xl">{children}</h3>
								),
								ul: ({ children }) => (
									<ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
								),
								ol: ({ children }) => (
									<ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
								),
								li: ({ children }) => <li className="leading-relaxed">{children}</li>,
								strong: ({ children }) => (
									<strong className="font-bold">{children}</strong>
								),
								u: ({ children }) => (
									<u className="underline decoration-2 underline-offset-2">{children}</u>
								),
							}}
						>
							{processedContent}
						</ReactMarkdown>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
