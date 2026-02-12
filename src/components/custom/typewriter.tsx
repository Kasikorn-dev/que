"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
	phrases: string[];
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
}

export function Typewriter({
	phrases,
	typingSpeed = 100,
	deletingSpeed = 50,
	pauseDuration = 2000,
}: TypewriterProps) {
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentPhrase = phrases[currentPhraseIndex];
		
		// Safety check
		if (!currentPhrase) return;

		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					// Typing
					if (currentText.length < currentPhrase.length) {
						setCurrentText(currentPhrase.slice(0, currentText.length + 1));
					} else {
						// Finished typing, pause then start deleting
						setTimeout(() => setIsDeleting(true), pauseDuration);
					}
				} else {
					// Deleting
					if (currentText.length > 0) {
						setCurrentText(currentText.slice(0, -1));
					} else {
						// Finished deleting, move to next phrase
						setIsDeleting(false);
						setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
					}
				}
			},
			isDeleting ? deletingSpeed : typingSpeed,
		);

		return () => clearTimeout(timeout);
	}, [
		currentText,
		currentPhraseIndex,
		isDeleting,
		phrases,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
	]);

	return (
		<span className="inline-flex items-center">
			{currentText}
			<span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-primary" />
		</span>
	);
}
