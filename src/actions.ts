import { db, schema } from "./db";
import { createServerFn } from "@tanstack/react-start";

export const getCount = createServerFn({ method: "GET" }).handler(async () => {
	const [result] = await db.select().from(schema.countTable).execute();
	return result.value;
});

export const incrementCount = createServerFn({ method: "POST" })
	.validator((addBy: number) => addBy)
	.handler(async ({ data }) => {
		const [result] = await db.transaction(async (tx) => {
			const [current] = await tx.select().from(schema.countTable).execute();
			return await tx
				.update(schema.countTable)
				.set({ value: current.value + data })
				.returning()
				.execute();
		});

		return result.value;
	});

export const subscribeEmail = createServerFn({ method: "POST" })
	.validator((email: string) => email)
	.handler(async ({ data }) => {
		await db
			.insert(schema.subscriptionsTable)
			.values({ email: data })
			.execute();
	});
