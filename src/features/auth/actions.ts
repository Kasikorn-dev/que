"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
	type LoginInput,
	type SignupInput,
	loginSchema,
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

export async function signout() {
	const supabase = await createSupabaseServerClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/signin");
}
