import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { getCount, subscribeEmail } from '../actions';
import { Counter } from '../components/Counter';
import { useSetValueCallback } from '../components/StoreProvider';

export const Route = createFileRoute('/')({
	component: Home,
	loader: async () => await getCount(),
});

function Home() {
	const count = Route.useLoaderData();
	const [email, setEmail] = useState('');
	const [subscribed, setSubscribed] = useState(false);

	const setConfirmedCount = useSetValueCallback(
		'confirmed',
		(value: number) => value,
	);

	useEffect(() => {
		setConfirmedCount(count);
	}, [count, setConfirmedCount]);

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await subscribeEmail({ data: email }).then(() => {
			setEmail('');
			setSubscribed(true);
		});
	};

	return (
		<main className="text-center mx-auto p-4 space-y-10 max-w-xl mb-20">
			<header>
				<h1 className="text-4xl font-bold">Shuffle a Deck. Make History.</h1>
			</header>
			<div className="space-y-4">
				<p>
					Ever shuffled a deck of cards? You've likely created an order that's
					<strong> never existed before. Anywhere. Ever.</strong>
				</p>
				<p>Seriously.</p>
				<p>
					The number of ways to arrange 52 cards is so mind-bogglingly vast that
					every thorough shuffle is almost certainly a cosmic first. It's a
					number with 68 digits!
				</p>
				<p>To be precise...</p>
			</div>
			<div className="font-mono text-4xl mx-auto wrap-anywhere text-wrap w-[4ch]">
				+80,658,175,170,900,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000.
			</div>
			<div className="space-y-4">
				<p>
					Imagine the Roman Colosseum packed with 60,000 people. Each person has
					a button. Every time they press it, a massive shared counter ticks up
					by one. If everyone presses their button once per second—nonstop—it
					would still take 426,275,659 × 10<sup>55</sup> years to count all the
					way to 52 factorial.
				</p>
				<p>Don't believe it? Go ahead and try!</p>
				<div className="flex flex-col justify-center items-center gap-3">
					<Counter />
				</div>
			</div>
			<div className="rounded-lg px-4 py-6 bg-slate-800 flex flex-col gap-5">
				<p className="text-xl">Find out when the percentage changes</p>
				{subscribed ? (
					<p className="text-slate-300">We'll keep you posted!</p>
				) : (
					<form
						className="*:data-[slot=input]:rounded-r-none flex *:data-[slot=button]:rounded-l-none *:data-[slot=button]:border-l-0"
						onSubmit={handleEmailSubmit}
					>
						<input
							data-slot="input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="rounded-md border border-slate-600 px-2 py-1 w-full"
							placeholder="Enter your email..."
						/>
						<button
							data-slot="button"
							className="rounded-md border border-slate-600 p-2"
							type="submit"
						>
							Subscribe
						</button>
					</form>
				)}
			</div>
		</main>
	);
}
