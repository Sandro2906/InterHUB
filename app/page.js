import React from "react";
import db from "@/lib/db";
export default async function Homee() {

async function getData() {
  const [rows] = await db.query(`
    SELECT * 
    FROM oglas 
    ORDER BY Datum DESC 
    LIMIT 3
  `);
  return rows;
}

  const data = await getData();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-300">
              IT Prakse i Junior Poslovi
            </span>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Pronađi praksu i prvi posao u{" "}
              <span className="text-cyan-400">IT industriji</span>
            </h1>

            <h2 className="max-w-2xl text-lg text-slate-300 md:text-xl">
              Pregledaj juniorske pozicije, prakse i pošalji prijavu online na
              jednostavan i brz način.
            </h2>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="cursor-pointer rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-cyan-400">
                Pogledaj oglase
              </button>

              <button className="cursor-pointer rounded-2xl border border-slate-600 bg-slate-800 px-6 py-3 text-base font-semibold text-white transition hover:scale-105 hover:border-cyan-400 hover:bg-slate-700">
                Objavi oglas
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-700 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-xl font-bold text-cyan-400">Frontend</h3>
              <p className="text-slate-300">
                React, Next.js, Tailwind, TypeScript
              </p>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-xl font-bold text-cyan-400">Backend</h3>
              <p className="text-slate-300">
                Node.js, Express, SQL, API integracije
              </p>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-xl font-bold text-cyan-400">Praksa</h3>
              <p className="text-slate-300">
                Početne pozicije za studente i juniore
              </p>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-xl font-bold text-cyan-400">Remote</h3>
              <p className="text-slate-300">
                Poslovi iz BiH za domaće i strane firme
              </p>
            </div>
          </div>
        </section>

        
        <section className="mt-24">
          <h2 className="mb-8 text-3xl font-bold">Najnoviji oglasi</h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
{
  data.map((oglas)=>(

            <div key={oglas.OglasID} className="rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400">
              <p className="mb-2 text-sm text-cyan-400">{oglas.Tip}</p>
              <h3 className="text-xl font-bold">{oglas.Pozicija}</h3>
              <p className="mt-2 text-slate-300">{oglas.Firma} • {oglas.Lokacija}</p>
              <h1>Datum objave</h1>
              <p className="mt-4 text-sm text-slate-400">
  {new Date(oglas.Datum).toLocaleDateString("sr-RS")}
</p>
            </div>
       
  ))
  
}   </div>
          
        </section>

        
        <section className="mt-24">
          <h2 className="mb-8 text-3xl font-bold">Kako funkcioniše</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-800 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Pretraži oglase</h3>
              <p className="text-slate-300">
                Pregledaj otvorene prakse i juniorske pozicije po tehnologiji,
                gradu ili tipu rada.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-800 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Pošalji prijavu</h3>
              <p className="text-slate-300">
                Napravi profil, sačuvaj svoj CV i prijavi se na željeni oglas u
                nekoliko klikova.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-800 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Započni karijeru</h3>
              <p className="text-slate-300">
                Prati status prijave i pronađi svoju prvu priliku u IT svijetu.
              </p>
            </div>
          </div>
        </section>

        
        <section className="mt-24">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8 text-center">
              <h2 className="text-4xl font-extrabold text-cyan-400">120+</h2>
              <p className="mt-2 text-slate-300">Broj oglasa</p>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8 text-center">
              <h2 className="text-4xl font-extrabold text-cyan-400">45+</h2>
              <p className="mt-2 text-slate-300">Broj firmi</p>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-8 text-center">
              <h2 className="text-4xl font-extrabold text-cyan-400">800+</h2>
              <p className="mt-2 text-slate-300">Broj kandidata</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
