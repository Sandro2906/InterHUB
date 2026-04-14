import Link from "next/link";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function FirmaDashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "firma") redirect("/");

  const [oglasi] = await db.query(
    "SELECT * FROM oglas WHERE user_id = ? ORDER BY Datum DESC",
    [user.id]
  );

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Firma Dashboard</h1>
            <p className="text-slate-400">Tvoji oglasi</p>
          </div>

          <Link
            href="/firmaDashboard/novi"
            className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white"
          >
            Dodaj oglas
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800 bg-slate-800/50">
              <tr>
                <th className="px-4 py-3">Pozicija</th>
                <th className="px-4 py-3">Lokacija</th>
                <th className="px-4 py-3">Tip</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {oglasi.map((oglas) => (
                <tr key={oglas.OglasID} className="border-b border-slate-800">
                  <td className="px-4 py-3">{oglas.Pozicija}</td>
                  <td className="px-4 py-3">{oglas.Lokacija}</td>
                  <td className="px-4 py-3">{oglas.Tip}</td>
                  <td className="px-4 py-3">
                    {new Date(oglas.Datum).toLocaleDateString("sr-RS")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/firmaDashboard/${oglas.OglasID}`}
                      className="rounded-xl bg-cyan-500 px-4 py-2 text-white"
                    >
                      Detalji
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}