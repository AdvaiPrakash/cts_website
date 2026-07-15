import { getCurrentUser } from "@/lib/admin-auth";
import { db } from "@/utils/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDashboardOverview() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  let coursesCount = 0;
  let galleryCount = 0;
  let studentsCount = 0;
  let certsCount = 0;
  let leadsCount = 0;

  try {
    const courseRes = await db.execute("SELECT COUNT(*) as count FROM courses");
    coursesCount = Number(courseRes.rows[0].count);

    const galleryRes = await db.execute("SELECT COUNT(*) as count FROM gallery");
    galleryCount = Number(galleryRes.rows[0].count);

    const studentRes = await db.execute("SELECT COUNT(*) as count FROM students");
    studentsCount = Number(studentRes.rows[0].count);

    const certRes = await db.execute("SELECT COUNT(*) as count FROM certificates");
    certsCount = Number(certRes.rows[0].count);

    const leadRes = await db.execute("SELECT COUNT(*) as count FROM leads");
    leadsCount = Number(leadRes.rows[0].count);
  } catch (error) {
    console.error("Dashboard count queries failed, utilizing fallback counts:", error);
  }

  const statCards = [
    { label: "Active Courses", val: coursesCount, desc: "Syllabus modules and details", href: "/admin/courses" },
    { label: "Gallery Photos", val: galleryCount, desc: "Bento grid photo items", href: "/admin/gallery" },
    { label: "Enrolled Students", val: studentsCount, desc: "Profiles and registration numbers", href: "/admin/students" },
    { label: "Certificates Issued", val: certsCount, desc: "Issued course certificates", href: "/admin/certificates" },
    { label: "Enquiries Received", val: leadsCount, desc: "Form submissions & leads", href: "/admin/enquiries" },
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-text-page">
          Overview Dashboard
        </h2>
        <p className="text-xs text-text-page/60 font-sans mt-1">
          Welcome back, {user.name || user.email}! Manage your site content, courses details, students, and certifications below.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div 
            key={idx}
            className="p-6 bg-white border border-border-subtle rounded-xl shadow-sm flex flex-col justify-between h-44 hover:shadow-md transition-shadow"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">
                {stat.label}
              </span>
              <p className="text-4xl font-display font-black text-text-page">
                {stat.val}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle/50 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-text-page/50">{stat.desc}</span>
              {stat.href !== "#" && (
                <Link
                  href={stat.href}
                  className="px-3 py-1 rounded bg-black text-white hover:bg-black/90 font-bold text-[9px] uppercase tracking-wider transition-all"
                >
                  Manage
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Account Info card */}
      <div className="bg-white border border-border-subtle rounded-xl p-6 shadow-sm max-w-2xl space-y-4">
        <h3 className="text-md font-serif font-medium text-text-page border-b border-border-subtle/50 pb-2">
          Administrator Account Profile
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-text-page/80">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Email Address</span>
            <span>{user.email}</span>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Role Permission</span>
            <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[8px] font-bold uppercase rounded tracking-wide">
              {user.role}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Account Name</span>
            <span>{user.name || "Administrator"}</span>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-text-page/40 block mb-0.5">Created At</span>
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
