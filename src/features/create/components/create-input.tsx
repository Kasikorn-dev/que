"use client";

import { useState } from "react";
import { ArrowUp, AudioWaveform, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateInput() {
	const [input, setInput] = useState("");
	const router = useRouter();

	const generateCourse = api.course.generate.useMutation({
		onSuccess: (data) => {
			toast.success("Course generated successfully! 🎉");
			// router.push(`/course/${data.courseId}`);
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

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="flex flex-col min-h-[150px] p-4 bg-card rounded-2xl shadow-sm border border-border transition-all hover:shadow-md hover:border-ring/50">
				{/* Top: Textarea */}
				<Textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Learn anything..."
					disabled={isPending}
					className="flex-1 w-full border-0 focus-visible:ring-0 shadow-none resize-none p-2 text-lg placeholder:text-muted-foreground bg-transparent dark:bg-transparent"
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSubmit();
						}
					}}
					onInput={(e) => {
						const target = e.target as HTMLTextAreaElement;
						target.style.height = "auto";
						target.style.height = `${target.scrollHeight}px`;
					}}
				/>

				{/* Bottom: Actions */}
				<div className="flex items-center justify-between mt-4">
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
							size="icon"
							onClick={handleSubmit}
							disabled={!input.trim() || isPending}
							className={`h-10 w-10 rounded-full transition-all duration-200 ${
								input.trim()
									? "bg-primary text-primary-foreground hover:bg-primary/90"
									: "bg-muted text-muted-foreground"
							}`}
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
