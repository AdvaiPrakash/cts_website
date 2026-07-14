import { notFound } from "next/navigation";
import { CertificateForm } from "@/components/admin/certificates/CertificateForm";
import { db } from "@/utils/db";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCertificatePage({ params }: PageProps) {
  const { id } = await params;
  let certificate: {
    id: number;
    studentId: number;
    courseId: string;
    issueDate: string;
    grade: string;
    status: string;
  } | null = null;

  try {
    const result = await db.execute({
      sql: "SELECT * FROM certificates WHERE id = ?",
      args: [Number(id)],
    });

    if (result.rows.length > 0) {
      const row = result.rows[0];
      certificate = {
        id: Number(row.id),
        studentId: Number(row.student_id),
        courseId: row.course_id as string,
        issueDate: row.issue_date as string,
        grade: row.grade as string,
        status: row.status as string,
      };
    }
  } catch (error) {
    console.error("Database fetch failed in certificate edit view:", error);
  }

  if (!certificate) {
    notFound();
  }

  return (
    <div className="space-y-6 text-left">
      <div className="mb-4">
        <Link
          href="/admin/certificates"
          className="inline-flex items-center gap-1.5 text-xs text-text-page/60 hover:text-text-page font-bold transition-colors"
        >
          <span>←</span>
          <span>Back to Certificates</span>
        </Link>
      </div>

      <CertificateForm initialData={certificate} />
    </div>
  );
}
