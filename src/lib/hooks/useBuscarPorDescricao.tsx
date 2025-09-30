"use client";

// hooks/useBuscarPorDescricao.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type BuscarContextType = {
  resetFiltroPreco: boolean;
  setResetFiltroPreco: (value: boolean) => void;
  vlorMin: number;
  setVlorMin: (valor: number) => void;
  vlorMax: number;
  setVlorMax: (valor: number) => void;
  resetFiltroBusca:boolean;
  setResetFiltroBusca: (value: boolean) => void;
};

const BuscarContext = createContext<BuscarContextType | undefined>(undefined);

export function BuscarProvider({ children }: { children: ReactNode }) {
  const [vlorMin, setVlorMin] = useState(0);
  const [vlorMax, setVlorMax] = useState(10000);
  const [resetFiltroPreco, setResetFiltroPreco] = useState(false);
  const [resetFiltroBusca, setResetFiltroBusca] = useState(false);

  return (
    <BuscarContext.Provider
      value={{
        vlorMin,
        setVlorMin,
        vlorMax,
        setVlorMax,
        resetFiltroPreco,
        setResetFiltroPreco,
        resetFiltroBusca,
        setResetFiltroBusca
      }}
    >
      {children}
    </BuscarContext.Provider>
  );
}

export function useBuscarPorDescricao() {
  const context = useContext(BuscarContext);
  if (!context) {
    throw new Error(
      "useBuscarPorDescricao deve ser usado dentro de <BuscarProvider>"
    );
  }
  return context;
}
