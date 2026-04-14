import db from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { uploadCv } from "@/lib/actions";

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
            Ovdje možeš vidjeti svoje podatke i uploadovati CV.
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
                <p className="text-lg font-semibold break-all">{user.email}</p>
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
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">CV</h3>
            <p className="mb-6 text-sm text-slate-400">
              Uploaduj svoj CV u PDF, DOC ili DOCX formatu.
            </p>

            <form action={uploadCv} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Izaberi fajl
                </label>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  className="block w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-white transition hover:bg-cyan-400"
              >
                Upload CV
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="mb-2 text-sm text-slate-400">Trenutni CV</p>

              {user.cv_url ? (
                <a
                  href={user.cv_url}
                  download
                  className="inline-flex items-center rounded-xl bg-slate-800 px-4 py-2 font-medium text-cyan-400 transition hover:bg-slate-700"
                >
                  Preuzmi CV
                </a>
              ) : (
                <p className="text-sm text-slate-500">CV nije uploadovan.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}