"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword, getUserByEmail } from "@/lib/users";
import { ADMIN_COOKIE, createSessionToken, getCurrentUser } from "@/lib/admin-auth";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { canEditContent } from "@/lib/roles";

// AUTHORIZATION HELPERS
async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

async function requireEditor() {
  const user = await requireUser();
  if (!canEditContent(user.role)) {
    throw new Error("Forbidden: Editors and Admins only");
  }
  return user;
}

// LOGIN ACTION
export async function loginAction(_prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const userRow = await getUserByEmail(email);
    if (!userRow) {
      return { error: "Invalid credentials" };
    }

    const isValid = verifyPassword(password, userRow.password_hash as string);
    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    const token = await createSessionToken(Number(userRow.id));
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 86400, // 7 days
    });
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }

  // Redirect to dashboard on success
  redirect("/admin");
}

// LOGOUT ACTION
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

// COURSE UPSERT ACTION (CREATE/EDIT)
export async function upsertCourseAction(payload: {
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
  isNew: boolean;
}) {
  await requireEditor();

  const { id, title, image, link, eligibility, fees, duration, batch, description, rating, badge, syllabus, isNew } = payload;

  if (!id || !title || !image || !fees || !duration || !batch || !description) {
    throw new Error("Missing required fields");
  }

  try {
    if (isNew) {
      await db.execute({
        sql: `INSERT INTO courses (id, title, image, link, eligibility, fees, duration, batch, description, rating, badge, syllabus) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id.trim(),
          title.trim(),
          image.trim(),
          link || `/features/${id}`,
          eligibility || null,
          fees.trim(),
          duration.trim(),
          batch.trim(),
          description.trim(),
          rating || null,
          badge || null,
          JSON.stringify(syllabus),
        ],
      });
    } else {
      await db.execute({
        sql: `UPDATE courses 
              SET title = ?, image = ?, link = ?, eligibility = ?, fees = ?, duration = ?, batch = ?, description = ?, rating = ?, badge = ?, syllabus = ? 
              WHERE id = ?`,
        args: [
          title.trim(),
          image.trim(),
          link || `/features/${id}`,
          eligibility || null,
          fees.trim(),
          duration.trim(),
          batch.trim(),
          description.trim(),
          rating || null,
          badge || null,
          JSON.stringify(syllabus),
          id,
        ],
      });
    }

    revalidatePath("/");
    revalidatePath("/features");
    revalidatePath(`/features/${id}`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// COURSE DELETE ACTION
export async function deleteCourseAction(id: string) {
  await requireEditor();

  try {
    await db.execute({
      sql: "DELETE FROM courses WHERE id = ?",
      args: [id],
    });
    revalidatePath("/");
    revalidatePath("/features");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// GALLERY UPSERT ACTION (CREATE/EDIT)
export async function upsertGalleryAction(payload: {
  id?: number;
  title: string;
  category: string;
  image: string;
  gridClass: string;
}) {
  await requireEditor();

  const { id, title, category, image, gridClass } = payload;

  if (!title || !category || !image || !gridClass) {
    throw new Error("Missing required fields");
  }

  try {
    if (!id) {
      await db.execute({
        sql: "INSERT INTO gallery (title, category, image, gridClass) VALUES (?, ?, ?, ?)",
        args: [title.trim(), category.trim(), image.trim(), gridClass.trim()],
      });
    } else {
      await db.execute({
        sql: "UPDATE gallery SET title = ?, category = ?, image = ?, gridClass = ? WHERE id = ?",
        args: [title.trim(), category.trim(), image.trim(), gridClass.trim(), id],
      });
    }

    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// GALLERY DELETE ACTION
export async function deleteGalleryAction(id: number) {
  await requireEditor();

  try {
    await db.execute({
      sql: "DELETE FROM gallery WHERE id = ?",
      args: [id],
    });
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
