import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { CONTENT } from "@/content";

export async function GET() {
  try {
    const result = await db.execute("SELECT * FROM courses");
    const courses = result.rows.map((row) => ({
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
    }));
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Turso courses fetch failed, falling back to static content:", error);
    // Fallback to static content
    return NextResponse.json(CONTENT.courses.items);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, title, image, link, eligibility, fees, duration, batch, description, rating, badge, syllabus } = body;

    if (!id || !title || !image || !fees || !duration || !batch || !description || !syllabus) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.execute({
      sql: `INSERT INTO courses (id, title, image, link, eligibility, fees, duration, batch, description, rating, badge, syllabus) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
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
      ],
    });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
