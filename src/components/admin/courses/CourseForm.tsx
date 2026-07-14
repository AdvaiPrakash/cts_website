"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertCourseAction } from "@/app/admin/actions";

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

interface CourseFormProps {
  item?: Course;
}

export function CourseForm({ item }: CourseFormProps) {
  const router = useRouter();
  const isEditing = !!item;

  const [id, setId] = useState(item?.id || "");
  const [title, setTitle] = useState(item?.title || "");
  const [image, setImage] = useState(item?.image || "/course-accounting.jpg");
  const [eligibility, setEligibility] = useState(item?.eligibility || "");
  const [fees, setFees] = useState(item?.fees || "₹10,000/-");
  const [duration, setDuration] = useState(item?.duration || "2 Months");
  const [batch, setBatch] = useState(item?.batch || "Sunday Batch");
  const [description, setDescription] = useState(item?.description || "");
  const [rating, setRating] = useState<number | undefined>(item?.rating);
  const [badge, setBadge] = useState(item?.badge || "");
  const [syllabusText, setSyllabusText] = useState(item?.syllabus.join("\n") || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const syllabusList = syllabusText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    try {
      const payload = {
        id,
        title,
        image,
        link: `/features/${id}`,
        eligibility: eligibility || undefined,
        fees,
        duration,
        batch,
        description,
        rating,
        badge: badge || undefined,
        syllabus: syllabusList,
        isNew: !isEditing,
      };

      const res = await upsertCourseAction(payload);
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/admin/courses");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-border-subtle rounded-xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm text-left">
      <h2 className="text-xl font-serif font-medium text-text-page border-b border-border-subtle/50 pb-4 mb-6">
        {isEditing ? `Edit Course details: ${item.id}` : "Create New Course"}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-lg">
          ✕ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-text-page/80">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Unique Course ID (URL Slug) *</label>
          <input
            type="text"
            required
            disabled={isEditing}
            placeholder="e.g. gst-taxation"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Course Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Diploma in GST & Taxation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Duration *</label>
            <input
              type="text"
              required
              placeholder="e.g. 6 Months"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Batch Time *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sunday Batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Total Fees *</label>
            <input
              type="text"
              required
              placeholder="e.g. ₹20,000/-"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Course Rating (1.0 to 5.0)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              placeholder="e.g. 4.9"
              value={rating !== undefined ? rating : ""}
              onChange={(e) => setRating(e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Image Path *</label>
            <input
              type="text"
              required
              placeholder="e.g. /course-taxation.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Card Badge (Tag)</label>
            <input
              type="text"
              placeholder="e.g. Popular, Best Seller"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Eligibility Criteria</label>
          <input
            type="text"
            placeholder="e.g. +2 and Above"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Short Course Description *</label>
          <textarea
            required
            rows={3}
            placeholder="Overview of the career value and skills learned..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans font-normal"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Syllabus Curriculum (One item per line) *</label>
          <textarea
            required
            rows={6}
            placeholder="Basics of Accounting&#10;GST Computation&#10;Trial Balance..."
            value={syllabusText}
            onChange={(e) => setSyllabusText(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans font-normal leading-relaxed"
          />
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-grow py-3.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs tracking-wider transition-colors disabled:opacity-50 cursor-pointer border-none shadow-sm"
          >
            {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Course"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/courses")}
            className="px-6 py-3.5 rounded-lg bg-black/5 hover:bg-black/10 text-text-page font-semibold text-xs transition-colors cursor-pointer border-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
