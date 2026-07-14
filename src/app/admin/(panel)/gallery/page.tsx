"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ResponsiveTable } from "@/components/admin/ResponsiveTable";
import { deleteGalleryAction } from "@/app/admin/actions";
import Image from "next/image";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  gridClass: string;
}

export default function GalleryListPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGallery(data);
        }
      })
      .catch((err) => console.error("Error loading gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      const res = await deleteGalleryAction(id);
      if (res.success) {
        setGallery((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.error || "Failed to delete gallery item");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    }
  };

  const getSpanLabel = (gridClass: string) => {
    if (gridClass.includes("col-span-2")) return "Wide Card";
    if (gridClass.includes("row-span-2")) return "Tall Card";
    return "Standard Card";
  };

  const headers = [
    {
      key: "image" as keyof GalleryItem,
      label: "Photo",
      render: (item: GalleryItem) => (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border-subtle bg-black/5">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
      ),
    },
    {
      key: "title" as keyof GalleryItem,
      label: "Photo Caption",
      render: (item: GalleryItem) => (
        <Link 
          href={`/admin/gallery/${item.id}`}
          className="font-serif font-semibold text-text-page hover:text-primary transition-colors hover:underline"
        >
          {item.title}
        </Link>
      ),
    },
    { key: "category" as keyof GalleryItem, label: "Category" },
    {
      key: "gridClass" as keyof GalleryItem,
      label: "Bento Layout",
      render: (item: GalleryItem) => (
        <span className="px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded text-[10px] font-semibold text-text-page/70 border border-border-subtle">
          {getSpanLabel(item.gridClass)}
        </span>
      ),
    },
    { key: "actions" as keyof GalleryItem, label: "Actions" },
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* List Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle/50 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-serif font-medium text-text-page">
            Manage Gallery
          </h2>
          <p className="text-[11px] text-text-page/60 font-sans mt-0.5">
            Configure photos and layout for the interactive bento gallery.
          </p>
        </div>
        
        <Link
          href="/admin/gallery/new"
          className="px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-bold text-xs tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1 shadow-sm"
        >
          <span>＋</span>
          <span>Add Photo</span>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-text-page/40 font-semibold">
          Loading gallery items...
        </div>
      ) : (
        <ResponsiveTable<GalleryItem>
          headers={headers}
          data={gallery}
          primaryKey="title"
          actions={(item) => (
            <>
              <Link
                href={`/admin/gallery/${item.id}`}
                className="px-2.5 py-1.5 rounded bg-black/[0.03] hover:bg-black/[0.07] text-[10px] font-bold uppercase tracking-wider text-text-page transition-colors"
              >
                View
              </Link>
              <Link
                href={`/admin/gallery/${item.id}/edit`}
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
