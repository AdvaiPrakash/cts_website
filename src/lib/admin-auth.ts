import { cookies } from "next/headers";
import { getUserById } from "./users";
import { User } from "./roles";

export const ADMIN_COOKIE = "admin_session";
const enc = new TextEncoder();

async function hmac(msg: string, key: string) {
  const k = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const s = await crypto.subtle.sign("HMAC", k, enc.encode(msg));
  return [...new Uint8Array(s)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken(uid: number) {
  const exp = String(Date.now() + 7 * 864e5);
  const secret = process.env.AUTH_SECRET || "default_auth_secret_must_change_in_production_32_chars";
  return `${uid}.${exp}.${await hmac(`${uid}.${exp}`, secret)}`;
}

export async function readSession(token?: string | null): Promise<number | null> {
  if (!token) return null;
  const [uid, exp, sig] = token.split(".");
  if (!uid || !exp || Number(exp) < Date.now()) return null;
  const secret = process.env.AUTH_SECRET || "default_auth_secret_must_change_in_production_32_chars";
  const ok = sig === (await hmac(`${uid}.${exp}`, secret));
  return ok && Number.isInteger(+uid) ? +uid : null;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    const uid = await readSession(token);
    if (!uid) return null;
    return await getUserById(uid);
  } catch (error) {
    return null;
  }
}
