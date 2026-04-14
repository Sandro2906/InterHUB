"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function registerUser(formData) {
  const ime = formData.get("ime");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const [existing] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    throw new Error("Email već postoji.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (ime, email, password, role) VALUES (?, ?, ?, ?)",
    [ime, email, hashedPassword, role]
  );

  redirect("/login");
}

export async function loginUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Pogrešan email ili password.");
  }

  const user = rows[0];

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    throw new Error("Pogrešan email ili password.");
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "session_user",
    encodeURIComponent(
      JSON.stringify({
        id: user.id,
        ime: user.ime,
        email: user.email,
        role: user.role,
      })
    ),
    {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    }
  );

  if (user.role === "firma") {
    redirect("/firmaDashboard");
  }

  redirect("/oglasi");
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user");
  redirect("/");
}

export async function updateOglas(formData) {
  const user = await getCurrentUser();

  if (!user || user.role !== "firma") {
    redirect("/login");
  }

  const id = formData.get("id");
  const pozicija = formData.get("pozicija");
  const firma = formData.get("firma");
  const lokacija = formData.get("lokacija");
  const tip = formData.get("tip");
  const iskustvo = formData.get("iskustvo");
  const plata = formData.get("plata");
  const datum = formData.get("datum");

  await db.query(
    `
    UPDATE oglas
    SET Pozicija = ?, Firma = ?, Lokacija = ?, Tip = ?, Iskustvo = ?, Plata = ?, Datum = ?
    WHERE OglasID = ? AND user_id = ?
    `,
    [pozicija, firma, lokacija, tip, iskustvo, plata, datum, id, user.id]
  );

  revalidatePath(`/firmaDashboard/${id}`);
}

export async function deleteOglas(formData) {
  const user = await getCurrentUser();

  if (!user || user.role !== "firma") {
    redirect("/login");
  }

  const id = formData.get("id");

  await db.query(
    "DELETE FROM oglas WHERE OglasID = ? AND user_id = ?",
    [id, user.id]
  );

  revalidatePath("/firmaDashboard");
  redirect("/firmaDashboard");
}

export async function createOglas(formData) {
  const user = await getCurrentUser();

  if (!user || user.role !== "firma") {
    redirect("/login");
  }

  const pozicija = formData.get("pozicija");
  const firma = formData.get("firma");
  const lokacija = formData.get("lokacija");
  const tip = formData.get("tip");
  const iskustvo = formData.get("iskustvo");
  const plata = formData.get("plata");
  const datum = formData.get("datum");

  await db.query(
    `
    INSERT INTO oglas (Pozicija, Firma, Lokacija, Tip, Iskustvo, Plata, Datum, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [pozicija, firma, lokacija, tip, iskustvo, plata, datum, user.id]
  );

  revalidatePath("/firmaDashboard");
  redirect("/firmaDashboard");
}

export async function applyToJob(formData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "osoba") {
    throw new Error("Samo korisnik kao osoba može aplicirati.");
  }

  const oglasId = formData.get("oglasId");

  const [existing] = await db.query(
    "SELECT * FROM prijave WHERE oglas_id = ? AND user_id = ?",
    [oglasId, user.id]
  );

  if (existing.length > 0) {
    throw new Error("Već si aplicirao na ovaj oglas.");
  }

  await db.query(
    "INSERT INTO prijave (oglas_id, user_id) VALUES (?, ?)",
    [oglasId, user.id]
  );

  revalidatePath(`/oglasi/${oglasId}`);
}

export async function uploadCv(formData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "osoba") {
    redirect("/");
  }

  const file = formData.get("cv");

  if (!file || file.size === 0) {
    throw new Error("Nisi izabrao CV fajl.");
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Dozvoljeni su samo PDF, DOC i DOCX fajlovi.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${user.id}-${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const filePath = path.join(process.cwd(), "public", "cv", fileName);

  await writeFile(filePath, buffer);

  const cvUrl = `/cv/${fileName}`;

  await db.query("UPDATE users SET cv_url = ? WHERE id = ?", [cvUrl, user.id]);

  revalidatePath("/profil");
}