import db from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { updateLinkedin } from "@/lib/actions";

export default async function ProfilPage() {
  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    redirect("/login");
  }

  if (sessionUser.role === "firma") {
    redirect("/firmaDashboard");
  }

  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
    sessionUser.id,
  ]);

  const user = rows[0];

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 p-10 text-white">
        <h1 className="text-2xl">Korisnik nije pronađen u bazi.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Moj profil</h1>
          <p className="mt-2 text-slate-400">
            Ovdje možeš vidjeti svoje podatke i dodati LinkedIn profil.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg lg:col-span-2">
            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500 text-3xl font-bold text-white">
                {user.ime?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold">{user.ime}</h2>
                <p className="text-slate-400">{user.email}</p>
                <span className="mt-2 inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-medium text-cyan-300">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="mb-2 text-sm text-slate-400">Ime</p>
                <p className="text-lg font-semibold">{user.ime}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="mb-2 text-sm text-slate-400">Email</p>
                <p className="break-all text-lg font-semibold">{user.email}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="mb-2 text-sm text-slate-400">Broj telefona</p>
                <p className="text-lg font-semibold">
                  {user.phone || "Nije dodat"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="mb-2 text-sm text-slate-400">Uloga</p>
                <p className="text-lg font-semibold">{user.role}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 md:col-span-2">
                <p className="mb-2 text-sm text-slate-400">LinkedIn</p>
                {user.linkedin_url ? (
                  <a
                    href={user.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-lg font-semibold text-cyan-400 hover:underline"
                  >
                    {user.linkedin_url}
                  </a>
                ) : (
                  <p className="text-lg font-semibold">Nije dodat</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">LinkedIn profil</h3>
            <p className="mb-6 text-sm text-slate-400">
              Dodaj ili promijeni link svog LinkedIn profila.
            </p>

            <form action={updateLinkedin} className="space-y-4">
              <input
                type="url"
                name="linkedin_url"
                defaultValue={user.linkedin_url || ""}
                placeholder="https://www.linkedin.com/in/..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
              >
                Sačuvaj LinkedIn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}