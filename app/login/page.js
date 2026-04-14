import { loginUser } from "@/lib/actions";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-10 text-white">
      <form action={loginUser} className="mx-auto max-w-md space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3"
        />

        <button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold">
          Prijavi se
        </button>
      </form>
    </div>
  );
}