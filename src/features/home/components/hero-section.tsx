import { Button } from "@/components/ui/button";

export function HeroSection() {
	return (
		<section className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 text-center">
			<div className="flex max-w-3xl flex-col gap-4">
				<h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
					Transform any input into{" "}
					<span className="text-primary">active knowledge</span>
				</h1>
				<p className="text-lg text-muted-foreground sm:text-xl">
					A learner-first adaptive platform designed for curiosity, growth,
					focus, and fun.
				</p>
			</div>

			<div className="flex flex-col gap-3 sm:flex-row">
				<Button size="lg" className="min-w-[160px]">
					Start Learning
				</Button>
				<Button variant="outline" size="lg" className="min-w-[160px]">
					Learn More
				</Button>
			</div>
		</section>
	);
}
