"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

import { forgotPassword } from "../actions";
import { type ForgotPasswordInput, forgotPasswordSchema } from "../schemas";

export function ForgotPasswordForm() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordInput>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const onSubmit = async (data: ForgotPasswordInput) => {
		setError(null);
		const result = await forgotPassword(data);

		if (result?.error) {
			setError(result.error);
		} else {
			setIsSubmitted(true);
		}
	};

	if (isSubmitted) {
		return (
			<Card className="mx-auto w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Check your email</CardTitle>
					<CardDescription>
						We've sent a password reset link to your email address.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground text-sm">
						Please check your inbox and click the link to reset your password.
					</p>
					<div className="mt-4 text-center">
						<Link
							className="text-primary text-sm hover:underline"
							href="/signin"
						>
							Back to sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Forgot password?</CardTitle>
				<CardDescription>
					Enter your email address and we'll send you a link to reset your
					password.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							placeholder="m@example.com"
							type="email"
							{...register("email")}
							disabled={isSubmitting}
						/>
						{errors.email && (
							<p className="text-destructive text-sm">{errors.email.message}</p>
						)}
					</div>

					{error && (
						<div className="rounded-md bg-destructive/10 p-3">
							<p className="text-destructive text-sm">{error}</p>
						</div>
					)}

					<Button className="w-full" disabled={isSubmitting} type="submit">
						{isSubmitting ? "Sending..." : "Send reset link"}
					</Button>

					<div className="text-center text-sm">
						<Link className="text-primary hover:underline" href="/signin">
							Back to sign in
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
