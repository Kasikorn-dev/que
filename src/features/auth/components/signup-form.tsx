"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/custom";

import { signup } from "../actions";
import { type SignupInput, signupSchema } from "../schemas";

export function SignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignupInput>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: SignupInput) => {
		const result = await signup(data);

		if (result?.error) {
			toast.error(result.error);
			setError("root", { message: result.error });
		}
	};

	return (
		<Card className="w-full max-w-md border-border bg-card">
			<CardHeader className="space-y-1 text-center">
				<CardTitle className="text-2xl text-card-foreground">
					Create an account
				</CardTitle>
				<CardDescription>Enter your details to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							placeholder="John Doe"
							{...register("name")}
						/>
						{errors.name && (
							<p className="text-sm text-destructive">{errors.name.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="name@example.com"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-sm text-destructive">{errors.email.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							{...register("password")}
						/>
						{errors.password && (
							<p className="text-sm text-destructive">
								{errors.password.message}
							</p>
						)}
					</div>

					<SubmitButton className="w-full" isLoading={isSubmitting}>
						Sign Up
					</SubmitButton>
				</form>

				<div className="mt-6 text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link
						href="/signin"
						className="text-primary underline-offset-4 hover:underline"
					>
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
