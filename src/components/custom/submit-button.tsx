"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";

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
		<Button disabled={isSubmitting || disabled} type="submit" {...props}>
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
