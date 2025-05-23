import { useSetValueCallback, useValues } from './StoreProvider';

const FIFTY_TWO_FACTORIAL =
	80658175170900000000000000000000000000000000000000000000000000000000n;

const getPercent = (value: number) => {
	const percent = (value / Number(FIFTY_TWO_FACTORIAL)) * 100;
	return percent > 100 ? 100 : percent;
};

export function Counter() {
	const { pending, confirmed } = useValues();
	const incrementPending = useSetValueCallback('pending', (_, store) => {
		return store.getValue('pending') + 1;
	});

	const totalCount = pending + confirmed;

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="flex flex-col gap-1 items-center">
				<span className="font-bold text-2xl font-mono">
					{totalCount.toLocaleString()}
				</span>
				<span className="text-sm text-slate-400">
					<span className="pointer-fine:hidden">presses</span>
					<span className="pointer-coarse:hidden">clicks</span>
				</span>
			</div>
			<div className="font-mono">{getPercent(totalCount).toFixed(20)}%</div>
			<div className="h-2 w-full rounded-full bg-slate-800">
				<div
					className="h-2 rounded-full bg-slate-300"
					style={{ width: `${getPercent(totalCount)}%` }}
				/>
			</div>
			<button
				type="button"
				className="rounded-lg border-slate-300 px-3 py-1.5 flex items-center self-center text-center border"
				onClick={() => incrementPending()}
			>
				<span className="pointer-fine:hidden">Press here</span>
				<span className="pointer-coarse:hidden">Click here</span>
			</button>
		</div>
	);
}
