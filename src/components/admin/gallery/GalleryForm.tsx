"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertGalleryAction } from "@/app/admin/actions";

const GRID_CLASSES = [
  { value: "md:col-span-2 md:row-span-1 h-full", label: "Wide Card (Spans 2 Columns)" },
  { value: "md:col-span-1 md:row-span-2 h-full", label: "Tall Card (Spans 2 Rows)" },
  { value: "md:col-span-1 md:row-span-1 h-full", label: "Standard Card (1 Column)" },
];

const CATEGORIES = ["Classroom", "Workshops", "Seminars", "Mentorship", "Campus", "Celebrations"];

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  gridClass: string;
}

interface GalleryFormProps {
  item?: GalleryItem;
}

export function GalleryForm({ item }: GalleryFormProps) {
  const router = useRouter();
  const isEditing = !!item;

  const [title, setTitle] = useState(item?.title || "");
  const [category, setCategory] = useState(item?.category || "Classroom");
  const [image, setImage] = useState(item?.image || "/about-discuss.jpg");
  const [gridClass, setGridClass] = useState(item?.gridClass || "md:col-span-1 md:row-span-1 h-full");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        id: item?.id,
        title,
        category,
        image,
        gridClass,
      };

      const res = await upsertGalleryAction(payload);
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/admin/gallery");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-border-subtle rounded-xl p-6 sm:p-8 max-w-xl mx-auto shadow-sm text-left">
      <h2 className="text-xl font-serif font-medium text-text-page border-b border-border-subtle/50 pb-4 mb-6">
        {isEditing ? `Edit Gallery Item` : "Add New Gallery Photo"}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-lg">
          ✕ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-text-page/80">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Photo Caption *</label>
          <input
            type="text"
            required
            placeholder="e.g. Practical Tally Lab Session"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Category *</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Image Path *</label>
            <input
              type="text"
              required
              placeholder="e.g. /about-discuss.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">Bento Grid Span Style *</label>
          <select
            required
            value={gridClass}
            onChange={(e) => setGridClass(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page text-sm font-sans"
          >
            {GRID_CLASSES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-grow py-3.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs tracking-wider transition-colors disabled:opacity-50 cursor-pointer border-none shadow-sm"
          >
            {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Photo"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/gallery")}
            className="px-6 py-3.5 rounded-lg bg-black/5 hover:bg-black/10 text-text-page font-semibold text-xs transition-colors cursor-pointer border-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
