import useSWR from "swr";
import { ResponseHiper } from "@/types/responseHiper.types";
import { ROUTE_API_LOCAL } from "@/const/constantes.utils";
import { fetcher } from "@/lib/fetcher";

/**
 * Hook base para buscar todos os produtos usando SWR.
 * Centraliza o fetching e o cache para ser reutilizado por outros hooks.
 */
export function useProdutosData() {
  return useSWR<ResponseHiper>(ROUTE_API_LOCAL, fetcher, {
    refreshInterval: 600000, // 10 minutos
    dedupingInterval: 600000,
    revalidateOnFocus: false,
  });
}
