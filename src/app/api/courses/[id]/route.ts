import { NextResponse } from "next/server";
import { db } from "@/utils/db";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const result = await db.execute({
      sql: "SELECT * FROM courses WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const row = result.rows[0];
    const course = {
      id: row.id as string,
      title: row.title as string,
      image: row.image as string,
      link: row.link as string,
      eligibility: (row.eligibility as string) || undefined,
      fees: row.fees as string,
      duration: row.duration as string,
      batch: row.batch as string,
      description: row.description as string,
      rating: row.rating ? Number(row.rating) : undefined,
      badge: (row.badge as string) || undefined,
      syllabus: JSON.parse(row.syllabus as string) as string[],
    };

    return NextResponse.json(course);
  } catch (error: any) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, image, link, eligibility, fees, duration, batch, description, rating, badge, syllabus } = body;

    await db.execute({
      sql: `UPDATE courses 
            SET title = ?, image = ?, link = ?, eligibility = ?, fees = ?, duration = ?, batch = ?, description = ?, rating = ?, badge = ?, syllabus = ? 
            WHERE id = ?`,
      args: [
        title,
        image,
        link || `/features/${id}`,
        eligibility || null,
        fees,
        duration,
        batch,
        description,
        rating || null,
        badge || null,
        JSON.stringify(syllabus),
        id,
      ],
    });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await db.execute({
      sql: "DELETE FROM courses WHERE id = ?",
      args: [id],
    });
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
