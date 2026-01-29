import { CreateInput } from "@/features/create";

export default function CreatePage() {
	return (
		<div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center p-4">
			<div className="w-full max-w-3xl space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
						What do you want to learn?
					</h1>
					<p className="text-lg text-zinc-500 dark:text-zinc-400">
						Turn any topic into an interactive lesson in seconds.
					</p>
				</div>
				<CreateInput />
			</div>
		</div>
	);
}
