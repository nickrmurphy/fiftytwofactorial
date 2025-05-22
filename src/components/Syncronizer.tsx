import { createManager } from "tinytick";
import { useCallback, useEffect, useMemo } from "react";
import { useStore } from "./StoreProvider";
import { getCount, incrementCount } from "../actions";

export function Syncronizer() {
	const manager = useMemo(() => createManager(), []);
	const store = useStore();

	const syncTask = useCallback(async () => {
		if (!store) return;

		const pending = store?.getValue("pending");

		if (pending <= 0) {
			const confirmedCount = await incrementCount({ data: pending });

			store.setValue("confirmed", confirmedCount);
			store.setValue("pending", 0);
		} else {
			const confirmedCount = await getCount();
			store.setValue("confirmed", confirmedCount);
		}
	}, [store]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Run only on mount and unmount>
	useEffect(() => {
		manager.start();
		manager.setTask("sync", syncTask, "", {
			repeatDelay: 2000,
		});
		manager.scheduleTaskRun("sync");

		return () => {
			manager.stop();
		};
	}, []);

	return null;
}
