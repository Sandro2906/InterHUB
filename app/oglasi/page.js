import { FilterOglasa } from "@/components/FilterOglasa";
import Kartica from "@/components/Kartica";
import React from "react";
import db from "@/lib/db";

export default async function Oglas({ searchParams }) {
  const params = await searchParams;

  const search = params.search || "";
  const grad = params.grad || "";

  let query = "SELECT * FROM oglas WHERE 1=1";
  let values = [];

  if (search) {
    query += " AND (Pozicija LIKE ? OR Firma LIKE ?)";
    values.push(`%${search}%`, `%${search}%`);
  }

  if (grad) {
    query += " AND Lokacija = ?";
    values.push(grad);
  }

  query += " ORDER BY Datum DESC";

  const [oglasi] = await db.query(query, values);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      
      {/* ISTI CONTAINER ZA SVE */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        
        <FilterOglasa initialSearch={search} initialGrad={grad} />

        <div className="mt-6 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Dostupni oglasi
          </h2>
        </div>

        <Kartica oglasi={oglasi} />

      </div>
    </div>
  );
}