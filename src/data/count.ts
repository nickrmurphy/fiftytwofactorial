import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/db";

export const getCount = createServerFn({
  method: "GET",
}).handler(async () => {
  const db = await getDb();
  const result = await db.execute("SELECT value FROM key_value WHERE key = 'count'");
  const count = (result.rows.at(0)?.value as number) ?? 0;
  return { count };
});

export const incrementCount = createServerFn({
  method: "POST",
})
  .inputValidator((data) => z.object({ count: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const db = await getDb();
    await db.execute(
      "UPDATE key_value SET value = value + ?, updated_at = CURRENT_TIMESTAMP WHERE key = 'count'",
      [data.count],
    );
    return getCount();
  });
