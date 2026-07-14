import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const regnumber = searchParams.get("regnumber");

    if (!regnumber) {
      return NextResponse.json({ error: "Registration number is required" }, { status: 400 });
    }

    const query = `
      SELECT 
        s.name as student_name,
        s.email as student_email,
        s.phone as student_phone,
        s.regnumber as student_regnumber,
        c.issue_date,
        c.grade,
        c.status,
        co.title as course_title,
        co.duration as course_duration
      FROM students s
      JOIN certificates c ON c.student_id = s.id
      JOIN courses co ON co.id = c.course_id
      WHERE LOWER(s.regnumber) = LOWER(?)
      LIMIT 1
    `;

    const result = await db.execute({
      sql: query,
      args: [regnumber.trim()],
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "No certificate found with this registration number" }, { status: 404 });
    }

    const row = result.rows[0];
    return NextResponse.json({
      studentName: row.student_name,
      studentEmail: row.student_email,
      studentPhone: row.student_phone,
      studentRegnumber: row.student_regnumber,
      issueDate: row.issue_date,
      grade: row.grade,
      status: row.status,
      courseTitle: row.course_title,
      courseDuration: row.course_duration,
    });
  } catch (error: any) {
    console.error("Error verifying certificate:", error);
    return NextResponse.json({ error: error.message || "Failed to verify certificate" }, { status: 500 });
  }
}
