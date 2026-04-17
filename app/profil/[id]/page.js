import db from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function KandidatProfilPage({ params }) {
  const { id } = await params;

  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    redirect("/login");
  }

  if (sessionUser.role !== "firma") {
    redirect("/");
  }

  const [rows] = await db.query(
    "SELECT id, ime, email, phone, role, linkedin_url FROM users WHERE id = ?",
    [id]
  );

  const kandidat = rows[0];

  if (!kandidat) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold">Kandidat nije pronađen.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <Link
            href="/firmaDashboard"
            className="text-cyan-400 transition hover:underline"
          >
            ← Nazad na dashboard
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
          <div className="mb-8 flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500 text-3xl font-bold text-white">
              {kandidat.ime?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{kandidat.ime}</h1>
              <p className="text-slate-400">{kandidat.email}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="mb-2 text-sm text-slate-400">Ime</p>
              <p className="text-lg font-semibold">{kandidat.ime}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="mb-2 text-sm text-slate-400">Email</p>
              <p className="break-all text-lg font-semibold">{kandidat.email}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="mb-2 text-sm text-slate-400">Telefon</p>
              <p className="text-lg font-semibold">
                {kandidat.phone || "Nije dodat"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="mb-2 text-sm text-slate-400">Uloga</p>
              <p className="text-lg font-semibold">{kandidat.role}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 md:col-span-2">
              <p className="mb-2 text-sm text-slate-400">LinkedIn profil</p>

              {kandidat.linkedin_url ? (
                <a
                  href={kandidat.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white transition hover:bg-cyan-400"
                >
                  Otvori LinkedIn profil
                </a>
              ) : (
                <p className="text-lg font-semibold">Kandidat nije dodao LinkedIn profil.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}