export default function TermsPage() {
	return (
		<main className="mx-auto min-h-[calc(100vh-8rem)] max-w-3xl px-4 py-16">
			<article className="prose prose-neutral dark:prose-invert">
				<h1 className="text-3xl font-medium tracking-tight text-foreground">
					Terms of Service
				</h1>
				<p className="text-muted-foreground">Last updated: January 2026</p>

				<section className="mt-8 space-y-6">
					<div>
						<h2 className="text-xl font-medium text-foreground">
							1. Acceptance of Terms
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							By accessing and using Que, you agree to be bound by these Terms
							of Service. If you do not agree to these terms, please do not use
							our service.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							2. Use of Service
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							You may use Que for personal, non-commercial learning purposes.
							You agree not to misuse the service, attempt to access it through
							unauthorized means, or interfere with other users&apos;
							experience.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							3. User Accounts
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							You are responsible for maintaining the confidentiality of your
							account credentials and for all activities that occur under your
							account. Please notify us immediately of any unauthorized use.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							4. Intellectual Property
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							All content, features, and functionality of Que are owned by AIO
							and are protected by copyright, trademark, and other intellectual
							property laws.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							5. Limitation of Liability
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							Que is provided &quot;as is&quot; without warranties of any kind.
							We are not liable for any indirect, incidental, or consequential
							damages arising from your use of the service.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium text-foreground">
							6. Changes to Terms
						</h2>
						<p className="mt-2 leading-relaxed text-muted-foreground">
							We may update these terms from time to time. We will notify you of
							any significant changes by posting the new terms on this page.
						</p>
					</div>
				</section>
			</article>
		</main>
	);
}
