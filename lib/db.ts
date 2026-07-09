import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  // eslint-disable-next-line no-var
  var __db: Db | undefined;
}

// Lazily created so `next build`'s page-data collection (which imports this
// module without ever querying it) doesn't require DATABASE_URL to be set.
function getDb(): Db {
  if (!globalThis.__db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set. Add it to your .env file.");
    }
    globalThis.__db = drizzle(postgres(url), { schema });
  }
  return globalThis.__db;
}

export const db: Db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb() as object, prop, receiver);
  },
});
