import { CourseForm } from "@/components/admin/courses/CourseForm";
import Link from "next/link";

export default function NewCoursePage() {
  return (
    <div className="space-y-6 text-left">
      <div className="mb-4">
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs text-text-page/60 hover:text-text-page font-bold transition-colors"
        >
          <span>←</span>
          <span>Back to Courses</span>
        </Link>
      </div>

      <CourseForm />
    </div>
  );
}
