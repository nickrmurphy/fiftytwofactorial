import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { getCount } from '../actions';
import { Content } from '../components/content';
import { Counter } from '../components/counter';
import { EmailForm } from '../components/email-form';
import { Hero } from '../components/hero';
import { useSetValueCallback } from '../components/store-provider';

export const Route = createFileRoute('/')({
	component: Home,
	loader: async () => await getCount(),
});

function Home() {
	const count = Route.useLoaderData();

	const setConfirmedCount = useSetValueCallback(
		'confirmed',
		(value: number) => value,
	);

	useEffect(() => {
		setConfirmedCount(count);
	}, [count, setConfirmedCount]);

	return (
		<main className="text-center mx-auto p-4 space-y-10 max-w-xl mb-20">
			<Hero>Shuffle a Deck. Make History.</Hero>
			<Content>
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
			</Content>
			<div className="font-mono text-4xl mx-auto wrap-anywhere text-wrap w-[4ch]">
				+80,658,175,170,900,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000.
			</div>
			<Content>
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
			</Content>
			<EmailForm />
		</main>
	);
}
