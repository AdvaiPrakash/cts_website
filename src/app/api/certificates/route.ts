import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET() {
  try {
    const query = `
      SELECT 
        c.id,
        c.student_id,
        c.course_id,
        c.issue_date,
        c.grade,
        c.status,
        s.name as student_name,
        s.regnumber as student_regnumber,
        co.title as course_title
      FROM certificates c
      JOIN students s ON s.id = c.student_id
      JOIN courses co ON co.id = c.course_id
      ORDER BY c.id DESC
    `;
    const result = await db.execute(query);
    const items = result.rows.map((row) => ({
      id: Number(row.id),
      studentId: Number(row.student_id),
      courseId: row.course_id as string,
      issueDate: row.issue_date as string,
      grade: row.grade as string,
      status: row.status as string,
      studentName: row.student_name as string,
      studentRegnumber: row.student_regnumber as string,
      courseTitle: row.course_title as string,
    }));
    return NextResponse.json(items);
  } catch (error: any) {
    console.error("Error fetching certificates list:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
