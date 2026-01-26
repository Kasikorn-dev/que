"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends ButtonProps {
	children: React.ReactNode;
	isLoading?: boolean;
}

export function SubmitButton({
	children,
	isLoading,
	disabled,
	...props
}: SubmitButtonProps) {
	const { pending } = useFormStatus();
	const isSubmitting = isLoading || pending;

	return (
		<Button type="submit" disabled={isSubmitting || disabled} {...props}>
			{isSubmitting ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait
				</>
			) : (
				children
			)}
		</Button>
	);
}
