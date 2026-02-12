"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SubmitButton } from "@/components/custom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../actions";
import { type LoginInput, loginSchema } from "../schemas";
import { SocialAuth } from "./social-auth";

export function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginInput) => {
		const result = await login(data);

		if (result?.error) {
			toast.error(result.error);
			setError("root", { message: result.error });
		}
	};

	return (
		<Card className="w-full max-w-md border-border bg-card">
			<CardHeader className="space-y-1 text-center">
				<CardTitle className="text-2xl text-card-foreground">
					Welcome back
				</CardTitle>
				<CardDescription>
					Enter your email to sign in to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-destructive text-sm">{errors.email.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
							<Link
								className="text-primary text-xs hover:underline"
								href="/forgot-password"
							>
								Forgot password?
							</Link>
						</div>
						<Input
							id="password"
							placeholder="••••••••"
							type="password"
							{...register("password")}
						/>
						{errors.password && (
							<p className="text-destructive text-sm">
								{errors.password.message}
							</p>
						)}
					</div>

					<SubmitButton className="w-full" isLoading={isSubmitting}>
						Sign In
					</SubmitButton>
				</form>

				<div className="relative my-4">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-card px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>

				<SocialAuth />

				<div className="mt-6 text-center text-muted-foreground text-sm">
					Don&apos;t have an account?{" "}
					<Link
						className="text-primary underline-offset-4 hover:underline"
						href="/signup"
					>
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
