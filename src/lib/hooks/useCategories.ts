import useSWR from "swr";
import { ResponseHiper } from "@/types/responseHiper.types";
import { ROUTE_API_LOCAL } from "@/const/constantes.utils";
import { fetcher } from "@/lib/fetcher";

export function useCategories() {
  const { data, error, isLoading } = useSWR<ResponseHiper>(
    ROUTE_API_LOCAL,
    fetcher,
    {
      refreshInterval: 600000, // 10 minutos
      dedupingInterval: 600000, // evita refetch duplicado por 10 minutos
      revalidateOnFocus: false, // não atualiza só porque voltou para a aba
    }
  );

  const categorias = Array.from(
    new Set(
      data?.produtos
        .map((item) => item.categoria)
        .filter((cat): cat is string => !!cat && cat.trim() !== "")
    )
  );

  return {
    categorias,
    isLoading,
    error,
  };
}
