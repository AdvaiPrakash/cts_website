import { scryptSync, randomBytes } from "node:crypto";
import { createClient } from "@libsql/client";

const [, , email, password, name] = process.argv;

if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password> [name]");
  process.exit(1);
}

const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("TURSO_CONNECTION_URL is not defined in environment variables");
  process.exit(1);
}

const db = createClient({ url, authToken });

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const passwordHash = hashPassword(password);
  const userRole = "admin";
  const createdAt = new Date().toISOString();
  const userName = name || "Administrator";

  console.log(`Bootstrapping admin account for ${email}...`);

  await db.execute({
    sql: `INSERT OR REPLACE INTO users (email, name, password_hash, role, created_at) 
          VALUES (?, ?, ?, ?, ?)`,
    args: [email.toLowerCase().trim(), userName, passwordHash, userRole, createdAt],
  });

  console.log("Admin account bootstrapped successfully!");
}

main().catch((err) => {
  console.error("Error creating admin account:", err);
  process.exit(1);
});
