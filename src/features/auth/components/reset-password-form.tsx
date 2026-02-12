"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { resetPassword } from "../actions";
import { type ResetPasswordInput, resetPasswordSchema } from "../schemas";

export function ResetPasswordForm() {
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
	});

	const onSubmit = async (data: ResetPasswordInput) => {
		setError(null);
		const result = await resetPassword(data);

		if (result?.error) {
			setError(result.error);
		}
		// If successful, the action will redirect to /signin
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Reset your password</CardTitle>
				<CardDescription>Enter your new password below.</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-2">
						<Label htmlFor="password">New Password</Label>
						<Input
							id="password"
							placeholder="••••••••"
							type="password"
							{...register("password")}
							disabled={isSubmitting}
						/>
						{errors.password && (
							<p className="text-destructive text-sm">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							placeholder="••••••••"
							type="password"
							{...register("confirmPassword")}
							disabled={isSubmitting}
						/>
						{errors.confirmPassword && (
							<p className="text-destructive text-sm">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					{error && (
						<div className="rounded-md bg-destructive/10 p-3">
							<p className="text-destructive text-sm">{error}</p>
						</div>
					)}

					<Button className="w-full" disabled={isSubmitting} type="submit">
						{isSubmitting ? "Resetting..." : "Reset password"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
