import { createClient } from "@libsql/client";
import { CONTENT } from "../content";

const url = process.env.TURSO_CONNECTION_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_CONNECTION_URL is not defined in environment variables");
}

const db = createClient({ url, authToken });

async function main() {
  console.log("Initializing database tables...");

  await db.execute(`
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      image TEXT NOT NULL,
      link TEXT NOT NULL,
      eligibility TEXT,
      fees TEXT NOT NULL,
      duration TEXT NOT NULL,
      batch TEXT NOT NULL,
      description TEXT NOT NULL,
      rating REAL,
      badge TEXT,
      syllabus TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      gridClass TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      source TEXT,
      created_at TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      regnumber TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      issue_date TEXT NOT NULL,
      grade TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Active',
      created_at TEXT NOT NULL
    )
  `);

  console.log("Tables created successfully.");

  // Seed courses
  console.log("Seeding courses...");
  const courses = CONTENT.courses.items;
  for (const course of courses) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO courses (id, title, image, link, eligibility, fees, duration, batch, description, rating, badge, syllabus) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        course.id,
        course.title,
        course.image,
        course.link,
        course.eligibility || null,
        course.fees,
        course.duration,
        course.batch,
        course.description,
        course.rating || null,
        course.badge || null,
        JSON.stringify(course.syllabus),
      ],
    });
  }

  // Seed gallery
  console.log("Seeding gallery...");
  const galleryItems = [
    {
      id: 1,
      title: "Inauguration Ceremony - Welcome Address",
      category: "Inauguration Ceremony",
      image: "/gallery/1.webp",
      gridClass: "md:col-span-2 md:row-span-1 h-full",
    },
    {
      id: 2,
      title: "Inauguration Ceremony - Ribbon Cutting",
      category: "Inauguration Ceremony",
      image: "/gallery/2.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 3,
      title: "Inauguration Ceremony - Lamp Lighting",
      category: "Inauguration Ceremony",
      image: "/gallery/3.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 4,
      title: "Inauguration Ceremony - Keynote Presentation",
      category: "Inauguration Ceremony",
      image: "/gallery/4.webp",
      gridClass: "md:col-span-1 md:row-span-2 h-full",
    },
    {
      id: 5,
      title: "Add on Course 2019-2020 - Group Photo",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0002.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 6,
      title: "Add on Course 2019-2020 - Batch Interactive Lecture",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0003.webp",
      gridClass: "md:col-span-2 md:row-span-1 h-full",
    },
    {
      id: 7,
      title: "Add on Course 2019-2020 - Live GST Filing Session",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0025.webp",
      gridClass: "md:col-span-1 md:row-span-2 h-full",
    },
    {
      id: 8,
      title: "Add on Course 2019-2020 - Tally Accounting Workshop",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0029.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 9,
      title: "Add on Course 2019-2020 - Practical Income Tax Training",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0030.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 10,
      title: "Add on Course 2019-2020 - Certificate Distribution Ceremony",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0031.webp",
      gridClass: "md:col-span-2 md:row-span-1 h-full",
    },
    {
      id: 11,
      title: "Add on Course 2019-2020 - Professional Guest Lecture",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0033.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 12,
      title: "Add on Course 2019-2020 - Hands-on Excel Laboratory Work",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0034.webp",
      gridClass: "md:col-span-1 md:row-span-2 h-full",
    },
    {
      id: 13,
      title: "Add on Course 2019-2020 - Q&A Seminar Session",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200730-WA0035.webp",
      gridClass: "md:col-span-2 md:row-span-1 h-full",
    },
    {
      id: 14,
      title: "Add on Course 2019-2020 - Career Guidance Mentorship",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200809-WA0223.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 15,
      title: "Add on Course 2019-2020 - Independence Day Celebration",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200815-WA0001_(1).webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 16,
      title: "Add on Course 2019-2020 - Faculty felicitation",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200815-WA0002.webp",
      gridClass: "md:col-span-2 md:row-span-1 h-full",
    },
    {
      id: 17,
      title: "Add on Course 2019-2020 - Student Project Presentation",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200815-WA0003.webp",
      gridClass: "md:col-span-1 md:row-span-2 h-full",
    },
    {
      id: 18,
      title: "Add on Course 2019-2020 - Accounting Softwares Lab Exam",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200815-WA0004.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 19,
      title: "Add on Course 2019-2020 - Annual Campus Meetup",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200815-WA0007.webp",
      gridClass: "md:col-span-1 md:row-span-1 h-full",
    },
    {
      id: 20,
      title: "Add on Course 2019-2020 - Closing Ceremony Group Photo",
      category: "Add on Course 2019-2020",
      image: "/gallery/IMG-20200815-WA0008.webp",
      gridClass: "md:col-span-2 md:row-span-1 h-full",
    },
  ];

  await db.execute("DELETE FROM gallery");
  for (const item of galleryItems) {
    await db.execute({
      sql: `INSERT INTO gallery (id, title, category, image, gridClass) VALUES (?, ?, ?, ?, ?)`,
      args: [item.id, item.title, item.category, item.image, item.gridClass],
    });
  }

  // Seed dummy students & certificates if empty
  const studentCheck = await db.execute("SELECT count(*) as count FROM students");
  if (Number(studentCheck.rows[0].count) === 0) {
    console.log("Seeding dummy students and certificates...");
    await db.execute({
      sql: `INSERT INTO students (id, name, email, phone, regnumber, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [1, "Johnatan Doe", "johnatan@example.com", "+91 98765 43210", "CTS-2026-001", new Date().toISOString()],
    });
    await db.execute({
      sql: `INSERT INTO students (id, name, email, phone, regnumber, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [2, "Rebeca Smith", "rebeca@example.com", "+91 98765 43211", "CTS-2026-002", new Date().toISOString()],
    });

    await db.execute({
      sql: `INSERT INTO certificates (id, student_id, course_id, issue_date, grade, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [1, 1, "cpa", "2026-06-15", "A+", "Active", new Date().toISOString()],
    });
    await db.execute({
      sql: `INSERT INTO certificates (id, student_id, course_id, issue_date, grade, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [2, 2, "tally-gst", "2026-06-20", "A", "Active", new Date().toISOString()],
    });
  }

  console.log("Database seeded successfully!");
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
