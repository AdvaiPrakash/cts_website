import "server-only";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { db } from "@/utils/db";
import { User, Role } from "./roles";

export { ROLES, canEditContent, canManageUsers } from "./roles";
export type { Role, User } from "./roles";

// Hash password with scrypt
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

// Verify password with timingSafeEqual
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(":");
    const computedHash = scryptSync(password, salt, 64);
    return timingSafeEqual(Buffer.from(hash, "hex"), computedHash);
  } catch (error) {
    return false;
  }
}

// Get user by email
export async function getUserByEmail(email: string) {
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email.toLowerCase().trim()],
  });

  if (result.rows.length === 0) return null;
  return result.rows[0];
}

// Get user by id
export async function getUserById(id: number): Promise<User | null> {
  const result = await db.execute({
    sql: "SELECT id, email, name, role, created_at FROM users WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    id: Number(row.id),
    email: row.email as string,
    name: (row.name as string) || null,
    role: row.role as Role,
    created_at: row.created_at as string,
  };
}

// Create a new user
export async function createUser(email: string, passwordPlain: string, name: string | null, role: Role) {
  const passwordHash = hashPassword(passwordPlain);
  const createdAt = new Date().toISOString();
  
  await db.execute({
    sql: "INSERT INTO users (email, name, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)",
    args: [email.toLowerCase().trim(), name, passwordHash, role, createdAt],
  });
}

// List all users
export async function listUsers(): Promise<User[]> {
  const result = await db.execute("SELECT id, email, name, role, created_at FROM users ORDER BY id ASC");
  return result.rows.map((row) => ({
    id: Number(row.id),
    email: row.email as string,
    name: (row.name as string) || null,
    role: row.role as Role,
    created_at: row.created_at as string,
  }));
}

// Delete user by ID
export async function deleteUser(id: number) {
  await db.execute({
    sql: "DELETE FROM users WHERE id = ?",
    args: [id],
  });
}

// Count administrators in the database
export async function countAdmins(): Promise<number> {
  const result = await db.execute("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
  if (result.rows.length === 0) return 0;
  return Number(result.rows[0].count);
}
