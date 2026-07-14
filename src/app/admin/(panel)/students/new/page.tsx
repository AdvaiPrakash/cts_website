import { StudentForm } from "@/components/admin/students/StudentForm";
import Link from "next/link";

export default function NewStudentPage() {
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

      <StudentForm />
    </div>
  );
}
