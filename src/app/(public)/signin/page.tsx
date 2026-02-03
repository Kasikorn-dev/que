import { SignInForm } from "@/features/auth";

export default function SignInPage() {
	return (
		<main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background px-4">
			<SignInForm />
		</main>
	);
}
