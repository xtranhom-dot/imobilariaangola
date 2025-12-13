import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../shared/schema.js";

let _client: ReturnType<typeof createClient> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

function initializeDatabase() {
  if (_db) return _db;

  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (!tursoUrl) {
    console.error("TURSO_DATABASE_URL is not set. Available env vars:", Object.keys(process.env).filter(k => k.includes("TURSO") || k.includes("DATABASE")));
    throw new Error(
      "TURSO_DATABASE_URL must be set. Did you forget to configure Turso?",
    );
  }

  if (!tursoToken) {
    console.error("TURSO_AUTH_TOKEN is not set.");
    throw new Error(
      "TURSO_AUTH_TOKEN must be set. Did you forget to configure Turso?",
    );
  }

  _client = createClient({
    url: tursoUrl,
    authToken: tursoToken,
  });

  _db = drizzle(_client, { schema });
  return _db;
}

export const client = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    if (!_client) initializeDatabase();
    return (_client as any)[prop];
  }
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    if (!_db) initializeDatabase();
    return (_db as any)[prop];
  }
});
