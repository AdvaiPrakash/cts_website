import "server-only";
import { createClient } from "@libsql/client";

const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_CONNECTION_URL is not defined in environment variables");
}

export const db = createClient({
  url,
  authToken,
});
