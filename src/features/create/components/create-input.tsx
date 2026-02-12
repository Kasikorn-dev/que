"use client";

import { ArrowUp, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Typewriter } from "@/components/custom/typewriter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";

export function CreateInput() {
	const [input, setInput] = useState("");
	const router = useRouter();

	const generateCourse = api.course.create.useMutation({
		onSuccess: (data) => {
			toast.success("Course created successfully! 🎉");
			router.push(`/course/${data.courseId}`);
		},
		onError: (error) => {
			toast.error(`Error: ${error.message}`);
		},
	});

	const handleSubmit = () => {
		if (!input.trim()) return;
		generateCourse.mutate({ text: input });
	};

	const isPending = generateCourse.isPending;

	const phrases = [
		"What would you like to learn today?",
		"Turn any topic into a course...",
		"Start your learning journey...",
		"Explore something new...",
		"Master a new skill...",
	];

	return (
		<div className="mx-auto w-full max-w-3xl space-y-6">
			{/* Animated Heading */}
			<div className="text-center">
				<h1 className="font-bold text-3xl text-foreground">
					<Typewriter phrases={phrases} />
				</h1>
			</div>

			{/* Input Card */}
			<div className="flex min-h-[150px] flex-col rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-ring/50 hover:shadow-md">
				{/* Top: Textarea */}
				<Textarea
					className="w-full flex-1 resize-none border-0 bg-transparent p-2 text-lg shadow-none placeholder:text-muted-foreground focus-visible:ring-0 dark:bg-transparent"
					disabled={isPending}
					onChange={(e) => setInput(e.target.value)}
					onInput={(e) => {
						const target = e.target as HTMLTextAreaElement;
						target.style.height = "auto";
						target.style.height = `${target.scrollHeight}px`;
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSubmit();
						}
					}}
					placeholder="Learn anything..."
					value={input}
				/>

				{/* Bottom: Actions */}
				<div className="mt-4 flex items-center justify-between">
					{/* Left Action: Add Attachment */}
					{/* <Button
						variant="ghost"
						size="icon"
						disabled={isPending}
						className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
					>
						<Plus className="h-5 w-5" />
					</Button> */}
					<div></div>

					{/* Right Actions: Voice & Submit */}
					<div className="flex items-center gap-2">
						{/* <Button
							variant="ghost"
							size="icon"
							disabled={isPending}
							className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
						>
							<AudioWaveform className="h-5 w-5" />
						</Button> */}

						<Button
							className={`h-10 w-10 rounded-full transition-all duration-200 ${
								input.trim()
									? "bg-primary text-primary-foreground hover:bg-primary/90"
									: "bg-muted text-muted-foreground"
							}`}
							disabled={!input.trim() || isPending}
							onClick={handleSubmit}
							size="icon"
						>
							{isPending ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<ArrowUp className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
