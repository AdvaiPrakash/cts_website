import { notFound } from "next/navigation";
import { CourseForm } from "@/components/admin/courses/CourseForm";
import { db } from "@/utils/db";
import { CONTENT } from "@/content";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  image: string;
  link: string;
  eligibility?: string;
  fees: string;
  duration: string;
  batch: string;
  description: string;
  rating?: number;
  badge?: string;
  syllabus: string[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: PageProps) {
  const { id } = await params;
  let course: Course | null = null;

  try {
    const result = await db.execute({
      sql: "SELECT * FROM courses WHERE id = ?",
      args: [id],
    });

    if (result.rows.length > 0) {
      const row = result.rows[0];
      course = {
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
    }
  } catch (error) {
    console.error("Database fetch failed in course edit page, using static fallback:", error);
  }

  // Fallback to static items
  if (!course) {
    const staticCourse = CONTENT.courses.items.find((item) => item.id === id);
    if (staticCourse) {
      course = staticCourse;
    }
  }

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6 text-left">
      <div className="mb-4">
        <Link
          href={`/admin/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-text-page/60 hover:text-text-page font-bold transition-colors"
        >
          <span>←</span>
          <span>Back to Course View</span>
        </Link>
      </div>

      <CourseForm item={course} />
    </div>
  );
}
