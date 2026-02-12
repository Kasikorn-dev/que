import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const features = [
	{
		title: "Curiosity",
		description: "Sparking the urge to explore and discover new knowledge.",
		icon: "🔍",
	},
	{
		title: "Growth",
		description: "Continuous improvement and mastery through practice.",
		icon: "🌱",
	},
	{
		title: "Focus",
		description: "Distraction-free environment for deep work and learning.",
		icon: "🎯",
	},
	{
		title: "Fun",
		description: "Engaging, game-like progress that keeps you motivated.",
		icon: "✨",
	},
];

export function FeaturesSection() {
	return (
		<section className="mx-auto max-w-5xl px-4 py-24">
			<div className="mb-12 text-center">
				<h2 className="mb-4 font-medium text-3xl text-foreground tracking-tight">
					Built for learners
				</h2>
				<p className="text-muted-foreground">
					Everything you need to unlock your potential
				</p>
			</div>

			<div className="grid gap-6 sm:grid-cols-2">
				{features.map((feature) => (
					<Card
						className="border-border bg-card transition-colors hover:bg-accent"
						key={feature.title}
					>
						<CardHeader>
							<div className="mb-2 text-3xl">{feature.icon}</div>
							<CardTitle className="text-card-foreground">
								{feature.title}
							</CardTitle>
							<CardDescription>{feature.description}</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</section>
	);
}
