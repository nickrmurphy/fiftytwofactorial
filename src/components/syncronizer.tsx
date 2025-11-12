import { useCallback, useEffect, useMemo } from 'react';
import { createManager } from 'tinytick';
import { getCount, incrementCount } from '../actions';
import { useStore } from './store-provider';

export function Syncronizer() {
	const manager = useMemo(() => createManager(), []);
	const store = useStore();

	const syncTask = useCallback(async () => {
		if (!store) return;

		store.transaction(async () => {
			const pending = store.getValue('pending');

			if (pending > 0) {
				const confirmedCount = await incrementCount({ data: pending });
				store.setValue('confirmed', confirmedCount);
				store.setValue('pending', store.getValue('pending') - pending);
			} else {
				const confirmedCount = await getCount();
				store.setValue('confirmed', confirmedCount);
			}
		});
	}, [store]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Run only on mount and unmount>
	useEffect(() => {
		manager.start();
		manager.setTask('sync', syncTask, '', {
			repeatDelay: 2000,
		});
		manager.scheduleTaskRun('sync');

		return () => {
			manager.stop();
		};
	}, []);

	return null;
}
