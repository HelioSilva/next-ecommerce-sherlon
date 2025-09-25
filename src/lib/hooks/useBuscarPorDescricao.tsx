"use client";

// hooks/useBuscarPorDescricao.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type BuscarContextType = {
  descricao: string;
  setDescricao: (desc: string) => void;
};

const BuscarContext = createContext<BuscarContextType | undefined>(undefined);

export function BuscarProvider({ children }: { children: ReactNode }) {
  const [descricao, setDescricao] = useState("");

  return (
    <BuscarContext.Provider value={{ descricao, setDescricao }}>
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
