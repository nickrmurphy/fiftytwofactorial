import { createLocalPersister } from "tinybase/persisters/persister-browser/with-schemas";
import { createStore, type NoTablesSchema } from "tinybase/with-schemas";
import * as UiReact from "tinybase/ui-react/with-schemas";

const storeSchema = {
	pending: {
		type: "number",
		default: 0,
	},
	confirmed: {
		type: "number",
		default: 0,
	},
} as const;

export const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
	[NoTablesSchema, typeof storeSchema]
>;

const { useCreateStore, useCreatePersister, Provider } = UiReactWithSchemas;

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const counterStore = useCreateStore(() =>
		createStore().setValuesSchema(storeSchema),
	);

	useCreatePersister(
		counterStore,
		(counterStore) => createLocalPersister(counterStore, "counter"),
		[],
		async (persister) => {
			await persister.startAutoLoad();
			await persister.startAutoSave();
		},
	);

	return <Provider store={counterStore}>{children}</Provider>;
}

export const { useValues, useSetValueCallback, useStore } = UiReactWithSchemas;
