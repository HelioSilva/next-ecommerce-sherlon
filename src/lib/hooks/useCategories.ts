import { useMemo } from "react";
import { useProdutosData } from "./useProdutosData";

export function useCategories() {
  const { data, error, isLoading } = useProdutosData();

  const categorias = useMemo(() => {
    if (!data?.produtos) {
      return [];
    }
    const cats = Array.from(
      new Set(
        data.produtos
          .filter((prod) => prod.quantidadeEmEstoque > 0)
          .map((item) => item.categoria)
          .filter((cat): cat is string => !!cat && cat.trim() !== "")
      )
    );
    return cats.sort((a, b) =>
      a.localeCompare(b, "pt-BR", { sensitivity: "base" })
    );
  }, [data]);

  return {
    categorias,
    isLoading,
    error,
  };
}
