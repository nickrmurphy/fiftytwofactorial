import { useState } from 'react';
import { subscribeEmail } from '../actions';

export function EmailForm() {
	const [email, setEmail] = useState('');
	const [subscribed, setSubscribed] = useState(false);

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await subscribeEmail({ data: email }).then(() => {
			setEmail('');
			setSubscribed(true);
		});
	};

	return (
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
	);
}
