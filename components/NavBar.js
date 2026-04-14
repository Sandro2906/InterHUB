import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutUser } from "@/lib/actions";

export default async function NavBar() {
  const user = await getCurrentUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-extrabold text-white">
          Inter<span className="text-cyan-400">HUB</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-slate-300 hover:text-cyan-400">
            Home
          </Link>

          <Link href="/oglasi" className="text-slate-300 hover:text-cyan-400">
            Oglasi
          </Link>

          {user?.role === "firma" && (
            <Link href="/firmaDashboard" className="text-slate-300 hover:text-cyan-400">
              Firme
            </Link>
          )}

          {user?.role === "osoba" && (
            <Link href="/profil" className="text-slate-300 hover:text-cyan-400">
              Profil
            </Link>
          )}

          {user ? (
            <form action={logoutUser}>
              <button className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:border-cyan-400 hover:text-cyan-400">
                Logout
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-400"
              >
                Registracija
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}