"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
	type LoginInput,
	loginSchema,
	type SignupInput,
	signupSchema,
} from "./schemas";

export async function login(input: LoginInput) {
	const supabase = await createSupabaseServerClient();

	const { email, password } = loginSchema.parse(input);

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return { error: error.message };
	}

	revalidatePath("/dashboard", "layout");
	redirect("/dashboard");
}

export async function signup(input: SignupInput) {
	const supabase = await createSupabaseServerClient();

	const { email, password, name } = signupSchema.parse(input);

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name,
			},
		},
	});

	if (error) {
		return { error: error.message };
	}

	revalidatePath("/dashboard", "layout");
	redirect("/dashboard");
}

export async function loginWithGoogle() {
	const supabase = await createSupabaseServerClient();
	// Robust way to get the base URL
	// In development, origin might be missing or weird, so we fallback to localhost
	// In production, you should set NEXT_PUBLIC_APP_URL
	const origin = (await headers()).get("origin") ?? "http://localhost:3000";
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		redirect("/error");
	}

	if (data.url) {
		redirect(data.url);
	}
}

export async function signout() {
	const supabase = await createSupabaseServerClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/signin");
}
