export const ROLES = ["admin", "editor", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export interface User {
  id: number;
  email: string;
  name: string | null;
  role: Role;
  created_at: string;
}

export const canEditContent = (r: Role) => r === "admin" || r === "editor";
export const canManageUsers = (r: Role) => r === "admin";
