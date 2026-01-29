"use client";

import { useState } from "react";
import { ArrowUp, AudioWaveform, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CreateInput() {
	const [input, setInput] = useState("");

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="flex flex-col min-h-[150px] p-4 bg-card rounded-2xl shadow-sm border border-border transition-all hover:shadow-md hover:border-ring/50">
				{/* Top: Textarea */}
				<Textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Learn anything..."
					className="flex-1 w-full border-0 focus-visible:ring-0 shadow-none resize-none p-2 text-lg placeholder:text-muted-foreground bg-transparent dark:bg-transparent"
					onInput={(e) => {
						const target = e.target as HTMLTextAreaElement;
						target.style.height = "auto";
						target.style.height = `${target.scrollHeight}px`;
					}}
				/>
				{/* Bottom: Actions */}
				<div className="flex items-center justify-between mt-4">
					{/* Left Action: Add Attachment */}
					<Button
						variant="ghost"
						size="icon"
						className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
					>
						<Plus className="h-5 w-5" />
					</Button>

					{/* Right Actions: Voice & Submit */}
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
						>
							<AudioWaveform className="h-5 w-5" />
						</Button>

						<Button
							size="icon"
							disabled={!input.trim()}
							className={`h-10 w-10 rounded-full transition-all duration-200 ${
								input.trim()
									? "bg-primary text-primary-foreground hover:bg-primary/90"
									: "bg-muted text-muted-foreground"
							}`}
						>
							<ArrowUp className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
