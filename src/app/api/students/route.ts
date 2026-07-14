import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET() {
  try {
    const result = await db.execute("SELECT * FROM students ORDER BY id DESC");
    const items = result.rows.map((row) => ({
      id: Number(row.id),
      name: row.name as string,
      email: (row.email as string) || "",
      phone: (row.phone as string) || "",
      regnumber: row.regnumber as string,
      createdAt: row.created_at as string,
    }));
    return NextResponse.json(items);
  } catch (error: any) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
