import { Client, createClient } from "@libsql/client/web";
import { env } from "@/env";

let db: Client | null = null;

const initDb = async () => {
  db = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });

  await db.execute(`
      CREATE TABLE IF NOT EXISTS key_value (
        key TEXT PRIMARY KEY,
        value INTEGER NOT NULL,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

  await db.execute(`
      INSERT INTO key_value (key, value) VALUES ('count', 0) ON CONFLICT (key) DO NOTHING
    `);

  return db;
};

export const getDb = async () => {
  if (db) return db;
  db = await initDb();
  return db;
};
