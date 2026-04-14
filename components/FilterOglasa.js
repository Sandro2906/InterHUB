"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function FilterOglasa({ initialSearch = "", initialGrad = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [grad, setGrad] = useState(initialGrad);

  function handlePretraga() {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (grad) {
      params.set("grad", grad);
    } else {
      params.delete("grad");
    }

    router.push(`/oglasi?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg backdrop-blur-sm">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Pretraga oglasa
        </h1>

        {/* Filteri: Search i Grad */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Pretraži poziciju ili firmu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400"
          />

          <select
            value={grad}
            onChange={(e) => setGrad(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          >
            <option value="">Svi gradovi</option>
            <option value="Banja Luka">Banja Luka</option>
            <option value="Sarajevo">Sarajevo</option>
            <option value="Tuzla">Tuzla</option>
            <option value="Mostar">Mostar</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            onClick={handlePretraga}
            className="cursor-pointer rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-cyan-400"
          >
            Pretraži
          </button>
        </div>
      </div>
    </div>
  );
}