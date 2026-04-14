import Link from "next/link";

export default function Kartica({ oglasi }) {
  return (
    <div className="grid gap-6 p-10 md:grid-cols-2 xl:grid-cols-3">
      {oglasi.map((data) => (
        <div
          key={data.OglasID}
          className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400"
        >
          <p className="mb-2 text-sm text-cyan-400">{data.Tip}</p>

          <h3 className="text-xl font-bold text-white">{data.Pozicija}</h3>

          <p className="mt-2 text-slate-300">
            {data.Firma} • {data.Lokacija}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-slate-300">
              {data.Iskustvo}
            </span>

            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-slate-300">
              {data.Plata ? `${data.Plata} KM` : "Po dogovoru"}
            </span>
          </div>

          <h1 className="mt-5 text-sm font-semibold text-white">
            Datum objave
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            {new Date(data.Datum).toLocaleDateString("sr-RS")}
          </p>

          <Link href={`/oglasi/${data.OglasID}`}>
            <button className="mt-4 cursor-pointer rounded-2xl bg-cyan-500 px-4 py-2 font-semibold text-white transition hover:scale-105 hover:bg-cyan-400">
              Detalji
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}