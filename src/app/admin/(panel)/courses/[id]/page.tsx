import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/utils/db";
import { CONTENT } from "@/content";
import Image from "next/image";

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

export default async function CourseViewPage({ params }: PageProps) {
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
    console.error("Database fetch failed in course detail view, using static fallback:", error);
  }

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
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* Back link */}
      <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs text-text-page/60 hover:text-text-page font-bold transition-colors"
        >
          <span>←</span>
          <span>Back to Courses</span>
        </Link>
        <Link
          href={`/admin/courses/${course.id}/edit`}
          className="px-3 py-1.5 rounded bg-primary hover:bg-primary-hover text-text-accent-dark font-bold text-xs tracking-wider uppercase transition-colors"
        >
          Edit Course
        </Link>
      </div>

      {/* Main Info */}
      <div className="grid md:grid-cols-12 gap-8 bg-white border border-border-subtle rounded-xl p-6 sm:p-8 shadow-sm">
        
        {/* Course details */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            {course.badge && (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold uppercase tracking-wider">
                {course.badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-text-page leading-tight">
              {course.title}
            </h1>
            <p className="text-xs text-text-page/70 leading-relaxed font-sans pt-2">
              {course.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-border-subtle/50 py-4 text-xs font-semibold text-text-page/80">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Duration</span>
              <span>{course.duration}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Batch Time</span>
              <span>{course.batch}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Course Fees</span>
              <span className="font-bold text-primary">{course.fees}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Course Rating</span>
              <span>{course.rating || 4.8} / 5.0</span>
            </div>
          </div>

          {course.eligibility && (
            <div className="p-4 bg-black/[0.01] border border-border-subtle rounded-xl text-xs text-text-page/70 leading-relaxed">
              💡 <span className="font-bold text-text-page/90 mr-1">Eligibility:</span> {course.eligibility}
            </div>
          )}
        </div>

        {/* Thumbnail Image */}
        <div className="md:col-span-5 relative w-full aspect-video md:aspect-[4/5] rounded-xl overflow-hidden border border-border-subtle bg-black/5">
          <Image src={course.image} alt={course.title} fill className="object-cover" />
        </div>
      </div>

      {/* Syllabus */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-page/50 border-b border-border-subtle/30 pb-2">
          Syllabus Modules ({course.syllabus.length})
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-left">
          {course.syllabus.map((topic, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-2.5 p-3.5 bg-white border border-border-subtle rounded-xl text-xs font-semibold text-text-page/85 leading-snug"
            >
              <span className="text-primary font-bold text-sm leading-none shrink-0 mt-0.5">✓</span>
              <span>{topic}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
