import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/utils/db";
import Image from "next/image";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  gridClass: string;
}

const STATIC_GALLERY: GalleryItem[] = [
  { id: 1, title: "Inauguration Ceremony - Welcome Address", category: "Inauguration Ceremony", image: "/gallery/1.webp", gridClass: "md:col-span-2 md:row-span-1 h-full" },
  { id: 2, title: "Inauguration Ceremony - Ribbon Cutting", category: "Inauguration Ceremony", image: "/gallery/2.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 3, title: "Inauguration Ceremony - Lamp Lighting", category: "Inauguration Ceremony", image: "/gallery/3.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 4, title: "Inauguration Ceremony - Keynote Presentation", category: "Inauguration Ceremony", image: "/gallery/4.webp", gridClass: "md:col-span-1 md:row-span-2 h-full" },
  { id: 5, title: "Add on Course 2019-2020 - Group Photo", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0002.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 6, title: "Add on Course 2019-2020 - Batch Interactive Lecture", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0003.webp", gridClass: "md:col-span-2 md:row-span-1 h-full" },
  { id: 7, title: "Add on Course 2019-2020 - Live GST Filing Session", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0025.webp", gridClass: "md:col-span-1 md:row-span-2 h-full" },
  { id: 8, title: "Add on Course 2019-2020 - Tally Accounting Workshop", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0029.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 9, title: "Add on Course 2019-2020 - Practical Income Tax Training", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0030.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 10, title: "Add on Course 2019-2020 - Certificate Distribution Ceremony", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0031.webp", gridClass: "md:col-span-2 md:row-span-1 h-full" },
  { id: 11, title: "Add on Course 2019-2020 - Professional Guest Lecture", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0033.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 12, title: "Add on Course 2019-2020 - Hands-on Excel Laboratory Work", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0034.webp", gridClass: "md:col-span-1 md:row-span-2 h-full" },
  { id: 13, title: "Add on Course 2019-2020 - Q&A Seminar Session", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200730-WA0035.webp", gridClass: "md:col-span-2 md:row-span-1 h-full" },
  { id: 14, title: "Add on Course 2019-2020 - Career Guidance Mentorship", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200809-WA0223.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 15, title: "Add on Course 2019-2020 - Independence Day Celebration", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200815-WA0001_(1).webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 16, title: "Add on Course 2019-2020 - Faculty felicitation", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200815-WA0002.webp", gridClass: "md:col-span-2 md:row-span-1 h-full" },
  { id: 17, title: "Add on Course 2019-2020 - Student Project Presentation", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200815-WA0003.webp", gridClass: "md:col-span-1 md:row-span-2 h-full" },
  { id: 18, title: "Add on Course 2019-2020 - Accounting Softwares Lab Exam", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200815-WA0004.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 19, title: "Add on Course 2019-2020 - Annual Campus Meetup", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200815-WA0007.webp", gridClass: "md:col-span-1 md:row-span-1 h-full" },
  { id: 20, title: "Add on Course 2019-2020 - Closing Ceremony Group Photo", category: "Add on Course 2019-2020", image: "/gallery/IMG-20200815-WA0008.webp", gridClass: "md:col-span-2 md:row-span-1 h-full" },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GalleryItemViewPage({ params }: PageProps) {
  const { id } = await params;
  let item: GalleryItem | null = null;

  try {
    const result = await db.execute({
      sql: "SELECT * FROM gallery WHERE id = ?",
      args: [Number(id)],
    });

    if (result.rows.length > 0) {
      const row = result.rows[0];
      item = {
        id: Number(row.id),
        title: row.title as string,
        category: row.category as string,
        image: row.image as string,
        gridClass: row.gridClass as string,
      };
    }
  } catch (error) {
    console.error("Database fetch failed in gallery detail view, using static fallback:", error);
  }

  if (!item) {
    const staticItem = STATIC_GALLERY.find((x) => x.id === Number(id));
    if (staticItem) {
      item = staticItem;
    }
  }

  if (!item) {
    notFound();
  }

  const getSpanLabel = (gridClass: string) => {
    if (gridClass.includes("col-span-2")) return "Wide Card (Spans 2 columns)";
    if (gridClass.includes("row-span-2")) return "Tall Card (Spans 2 rows)";
    return "Standard Card (1 column, 1 row)";
  };

  return (
    <div className="space-y-6 text-left max-w-xl mx-auto">
      
      {/* Back link & actions */}
      <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4">
        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-1.5 text-xs text-text-page/60 hover:text-text-page font-bold transition-colors"
        >
          <span>←</span>
          <span>Back to Gallery</span>
        </Link>
        <Link
          href={`/admin/gallery/${item.id}/edit`}
          className="px-3 py-1.5 rounded bg-primary hover:bg-primary-hover text-text-accent-dark font-bold text-xs tracking-wider uppercase transition-colors"
        >
          Edit Photo Info
        </Link>
      </div>

      {/* Main Card View */}
      <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
        
        {/* Photo */}
        <div className="relative w-full aspect-video border-b border-border-subtle bg-black/5">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <span className="px-2 py-0.5 bg-black/40 border border-white/20 text-white text-[8px] font-bold uppercase tracking-wider rounded">
              {item.category}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40">Caption</span>
            <h1 className="font-serif text-lg font-semibold text-text-page leading-snug">
              {item.title}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border-subtle/50 pt-4 text-xs font-semibold text-text-page/80">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Category</span>
              <span>{item.category}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Bento Layout</span>
              <span className="text-text-page">{getSpanLabel(item.gridClass)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
