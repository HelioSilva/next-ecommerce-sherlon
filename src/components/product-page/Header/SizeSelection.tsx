"use client";

import { setSizeSelection } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React, { use, useEffect, useState } from "react";

const SizeSelection = ({ sizes }: { sizes: string[] }) => {
  const [stTamanho, setStTamanho] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sizes.length > 0) {
      dispatch(setSizeSelection(String(stTamanho)));
    }
  }, [stTamanho]);

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">Tamanho</span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        <input
          placeholder="Digite o tamanho"
          type="text"
          value={stTamanho}
          onChange={(e) => {
            setStTamanho(e.target.value);
          }}
          className={
            "w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
          }
        />
      </div>
    </div>
  );
};

export default SizeSelection;
