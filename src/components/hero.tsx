export function Hero({ children }: { children: React.ReactNode }) {
	return (
		<header>
			<h1 className="text-4xl font-bold">{children}</h1>
		</header>
	);
}
