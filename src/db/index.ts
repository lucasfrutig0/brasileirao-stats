import { type BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL ?? "file:./data/scoutbr.db";

const filePath = databaseUrl.replace(/^file:/, "");
mkdirSync(dirname(resolve(filePath)), { recursive: true });

export const sqlite = new Database(filePath, {
  // WAL para leitura concorrente entre Caminho de request e Sync job
});
sqlite.pragma("journal_mode = WAL");

export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, { schema });
export { schema };
