"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ResponsiveTable } from "@/components/admin/ResponsiveTable";
import { deleteCourseAction } from "@/app/admin/actions";
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

export default function CoursesListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        }
      })
      .catch((err) => console.error("Error loading courses:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await deleteCourseAction(id);
      if (res.success) {
        setCourses((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.error || "Failed to delete course");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  };

  const headers = [
    {
      key: "image" as keyof Course,
      label: "Thumbnail",
      render: (item: Course) => (
        <div className="relative w-12 h-9 rounded overflow-hidden border border-border-subtle bg-black/5">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
      ),
    },
    {
      key: "title" as keyof Course,
      label: "Course Title",
      render: (item: Course) => (
        <Link 
          href={`/admin/courses/${item.id}`}
          className="font-serif font-semibold text-text-page hover:text-primary transition-colors hover:underline"
        >
          {item.title}
        </Link>
      ),
    },
    { key: "duration" as keyof Course, label: "Duration" },
    { key: "fees" as keyof Course, label: "Fees" },
    { key: "batch" as keyof Course, label: "Batch" },
    { key: "actions" as keyof Course, label: "Actions" },
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* List Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle/50 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-serif font-medium text-text-page">
            Manage Courses
          </h2>
          <p className="text-[11px] text-text-page/60 font-sans mt-0.5">
            Create, edit, or delete accounting, GST, and taxation courses.
          </p>
        </div>
        
        <Link
          href="/admin/courses/new"
          className="px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-bold text-xs tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1 shadow-sm"
        >
          <span>＋</span>
          <span>New Course</span>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-text-page/40 font-semibold">
          Loading courses...
        </div>
      ) : (
        <ResponsiveTable<Course>
          headers={headers}
          data={courses}
          primaryKey="title"
          actions={(item) => (
            <>
              <Link
                href={`/admin/courses/${item.id}`}
                className="px-2.5 py-1.5 rounded bg-black/[0.03] hover:bg-black/[0.07] text-[10px] font-bold uppercase tracking-wider text-text-page transition-colors"
              >
                View
              </Link>
              <Link
                href={`/admin/courses/${item.id}/edit`}
                className="px-2.5 py-1.5 rounded bg-black/[0.03] hover:bg-black/[0.07] text-[10px] font-bold uppercase tracking-wider text-text-page transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border-none"
              >
                Delete
              </button>
            </>
          )}
        />
      )}
    </div>
  );
}
