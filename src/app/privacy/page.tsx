export default function PrivacyPage() {
	return (
		<main className="mx-auto min-h-[calc(100vh-8rem)] max-w-3xl px-4 py-16">
			<article className="prose prose-neutral dark:prose-invert">
				<h1 className="text-3xl font-medium tracking-tight text-foreground">
					Privacy Policy
				</h1>
				<p className="text-muted-foreground">Last updated: January 2026</p>

				<section className="mt-8 space-y-6">
					<div>
						<h2 className="text-xl font-medium text-foreground">
							1. Information We Collect
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							We collect information you provide directly to us, such as when
							you create an account, use our services, or contact us for
							support. This may include your name, email address, and learning
							progress data.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							2. How We Use Your Information
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							We use the information we collect to provide, maintain, and
							improve our services, personalize your learning experience, and
							communicate with you about updates and new features.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							3. Data Security
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							We implement appropriate security measures to protect your
							personal information. Your data is encrypted in transit and at
							rest, and we regularly review our security practices.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							4. Your Rights
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							You have the right to access, update, or delete your personal
							information at any time. You can manage your account settings or
							contact us for assistance.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							5. Contact Us
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							If you have any questions about this Privacy Policy, please
							contact us at privacy@que.app
						</p>
					</div>
				</section>
			</article>
		</main>
	);
}
