"use client";

import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "../actions";

export function SocialAuth() {
	function handleLoginWithGoogle() {
		loginWithGoogle();
	}

	return (
		<Button
			variant="outline"
			onClick={handleLoginWithGoogle}
			className="w-full"
		>
			Continue with Google
		</Button>
	);
}
