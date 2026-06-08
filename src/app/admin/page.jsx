"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Admin() {
  const router = useRouter();
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState("");
  const [cupons, setCupons] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // não autenticado
    if (!token) {
      router.push("/");
    }

    loadCupons();
  }, []);

  const handleCupom = async () => {
    if (!cupom || !desconto) return;

    const existeCupom = cupons.some(
      (item) => item.cupom.toLowerCase() === cupom.toLowerCase(),
    );

    if (existeCupom) {
      alert("Esse cupom já existe");
      setCupom("");
      setDesconto("");
      return;
    }

    await fetch("/api/cupons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cupom: cupom,
        desconto,
      }),
    });

    // atualiza lista
    await loadCupons();

    setCupom("");
    setDesconto("");
  };

  const loadCupons = async () => {
    const response = await fetch("/api/cupons");

    const data = await response.json();

    setCupons(data.cupons);
  };

  const handleRemoverCupom = async (id) => {
    await fetch(`/api/cupons?id=${id}`, {
      method: "DELETE",
    });

    await loadCupons();
  };

  return (
    <main className="flex flex-1  mx-auto py-8  ">
      <div className=" w-full md:w-[60%] mx-auto  md:h-full flex flex-col items-center ">
        <div className=" w-[80%] md:w-full flex flex-col items-center md:flex-row md:items-center gap-4">
          <input
            autoFocus
            id="cupom"
            type="text"
            required
            value={cupom}
            onChange={(e) => setCupom(e.target.value)}
            placeholder="Nome do cupom. Ex: SHERLON20"
            className={cn(
              "uppercase w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#685048]",
            )}
          />
          <input
            id="desconto"
            type="number"
            required
            value={desconto}
            onChange={(e) => setDesconto(e.target.value)}
            placeholder="Percentual de desconto. Ex: 20"
            className={cn(
              "w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#685048]",
            )}
          />

          <button
            className="w-[200px] bg-green-600 hover:bg-green-700 
          active:scale-95 text-white font-medium px-5 
          py-2 rounded-xl shadow-md transition duration-200
          
          "
            onClick={handleCupom}
          >
            Adicionar
          </button>
        </div>
        {/* Lista de cupons */}
        <div className="pt-6 grid gap-2  md:grid-cols-3 ">
          {cupons.map((cupom) => (
            <div
              key={cupom.id}
              className="relative w-full bg-white rounded-xl shadow-lg p-5 border-2 border-dashed border-gray-400 mx-2"
            >
              {/* "Recorte" lateral estilo cupom */}
              <div className="absolute -left-3 top-1/2 w-6 h-6 bg-gray-100 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute -right-3 top-1/2 w-6 h-6 bg-gray-100 rounded-full transform -translate-y-1/2"></div>

              {/* Conteúdo */}
              <p className="text-sm text-green-600 font-semibold mb-1">
                CUPOM DE DESCONTO
              </p>

              <h2 className="uppercase text-2xl font-bold text-gray-500">
                {cupom.cupom}
              </h2>

              <div className="border-b-2 border-dashed my-3 "></div>

              <p className="text-5xl font-semibold text-green-500">
                {cupom.desconto}% OFF
              </p>

              <button
                className="mt-5 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => handleRemoverCupom(cupom.id)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
