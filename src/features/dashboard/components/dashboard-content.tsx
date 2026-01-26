"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";

const stats = [
	{ title: "Courses", value: "12", description: "Active courses" },
	{ title: "Progress", value: "68%", description: "Overall completion" },
	{ title: "Streak", value: "7", description: "Days in a row" },
	{ title: "Time", value: "24h", description: "Total learning time" },
];

export function DashboardContent() {
	const { greeting } = api.post.hello.useSuspenseQuery({ text: "world1" });
	console.log(greeting);
	return (
		<div className="flex flex-col gap-8">
			{/* Welcome Header */}

			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-medium tracking-tight text-foreground">
					Welcome back
				</h1>
				<p className="text-muted-foreground">
					Here&apos;s an overview of your progress
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.title} className="border-border bg-card">
						<CardHeader className="pb-2">
							<CardDescription>{stat.title}</CardDescription>
							<CardTitle className="text-3xl text-card-foreground">
								{stat.value}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								{stat.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Continue Learning */}
			<Card className="border-border bg-card">
				<CardHeader>
					<CardTitle className="text-card-foreground">
						Continue Learning
					</CardTitle>
					<CardDescription>Pick up where you left off</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
						<div className="flex flex-col gap-1">
							<p className="font-medium text-foreground">
								Introduction to TypeScript
							</p>
							<p className="text-sm text-muted-foreground">
								Chapter 3: Advanced Types
							</p>
						</div>
						<Button>Resume</Button>
					</div>
					<div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
						<div className="flex flex-col gap-1">
							<p className="font-medium text-foreground">React Fundamentals</p>
							<p className="text-sm text-muted-foreground">Chapter 5: Hooks</p>
						</div>
						<Button variant="outline">Resume</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
