import { notFound } from "next/navigation";
import { StudentForm } from "@/components/admin/students/StudentForm";
import { db } from "@/utils/db";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStudentPage({ params }: PageProps) {
  const { id } = await params;
  let student: {
    id: number;
    name: string;
    email: string;
    phone: string;
    regnumber: string;
  } | null = null;

  try {
    const result = await db.execute({
      sql: "SELECT * FROM students WHERE id = ?",
      args: [Number(id)],
    });

    if (result.rows.length > 0) {
      const row = result.rows[0];
      student = {
        id: Number(row.id),
        name: row.name as string,
        email: (row.email as string) || "",
        phone: (row.phone as string) || "",
        regnumber: row.regnumber as string,
      };
    }
  } catch (error) {
    console.error("Database fetch failed in student edit view:", error);
  }

  if (!student) {
    notFound();
  }

  return (
    <div className="space-y-6 text-left">
      <div className="mb-4">
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs text-text-page/60 hover:text-text-page font-bold transition-colors"
        >
          <span>←</span>
          <span>Back to Students</span>
        </Link>
      </div>

      <StudentForm initialData={student} />
    </div>
  );
}
