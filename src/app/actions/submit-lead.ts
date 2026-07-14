"use server";

import { db } from "@/utils/db";

export async function submitLeadAction(payload: {
  name: string;
  email: string;
  phone?: string;
  source?: string;
  company?: string; // Honeypot spam blocker
}) {
  const { name, email, phone, source, company } = payload;

  // Honeypot check: If the hidden honeypot field is filled, reject/drop silently
  if (company) {
    console.warn("Honeypot filled, dropping submission.");
    return { success: true };
  }

  if (!name || !name.trim()) {
    return { error: "Please enter your name." };
  }

  if (!email || !email.trim()) {
    return { error: "Please enter your email address." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await db.execute({
      sql: `INSERT INTO leads (name, email, phone, source, created_at) 
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        name.trim(),
        email.trim().toLowerCase(),
        phone ? phone.trim() : null,
        source || "lead-modal",
        new Date().toISOString(),
      ],
    });
    return { success: true };
  } catch (error: any) {
    console.error("Database lead submission failed:", error);
    return { error: error.message || "Failed to save request. Please try again." };
  }
}
