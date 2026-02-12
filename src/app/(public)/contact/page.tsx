import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
	return (
		<main className="mx-auto min-h-[calc(100vh-8rem)] max-w-3xl px-4 py-16">
			<div className="mb-12 text-center">
				<h1 className="font-medium text-3xl text-foreground tracking-tight">
					Contact Us
				</h1>
				<p className="mt-2 text-muted-foreground">
					Have questions? We&apos;d love to hear from you.
				</p>
			</div>

			<Card className="mx-auto max-w-md border-border bg-card">
				<CardHeader>
					<CardTitle className="text-card-foreground">
						Send us a message
					</CardTitle>
					<CardDescription>
						Fill out the form below and we&apos;ll get back to you as soon as
						possible.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								name="name"
								placeholder="Your name"
								required
								type="text"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								placeholder="name@example.com"
								required
								type="email"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="message">Message</Label>
							<Textarea
								id="message"
								name="message"
								placeholder="How can we help you?"
								required
								rows={5}
							/>
						</div>
						<Button className="w-full" type="submit">
							Send Message
						</Button>
					</form>
				</CardContent>
			</Card>

			<div className="mt-12 text-center">
				<p className="text-muted-foreground">
					Or email us directly at{" "}
					<a
						className="text-primary underline-offset-4 hover:underline"
						href="mailto:hello@que.app"
					>
						hello@que.app
					</a>
				</p>
			</div>
		</main>
	);
}
