import { NextResponse } from "next/server";
import { db } from "@/utils/db";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const result = await db.execute({
      sql: "SELECT * FROM gallery WHERE id = ?",
      args: [Number(id)],
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    const row = result.rows[0];
    const item = {
      id: Number(row.id),
      title: row.title as string,
      category: row.category as string,
      image: row.image as string,
      gridClass: row.gridClass as string,
    };

    return NextResponse.json(item);
  } catch (error: any) {
    console.error("Error fetching gallery item:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, category, image, gridClass } = body;

    await db.execute({
      sql: `UPDATE gallery 
            SET title = ?, category = ?, image = ?, gridClass = ? 
            WHERE id = ?`,
      args: [title, category, image, gridClass, Number(id)],
    });

    return NextResponse.json({ success: true, id: Number(id) });
  } catch (error: any) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await db.execute({
      sql: "DELETE FROM gallery WHERE id = ?",
      args: [Number(id)],
    });
    return NextResponse.json({ success: true, id: Number(id) });
  } catch (error: any) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
