import useSWR from "swr";
import { Product } from "@/types/product.types";
import { ProdutoHiper } from "@/types/productHiper.types";
import { ResponseHiper } from "@/types/responseHiper.types";
import { toCapitalCase } from "@/lib/utils";
import { ROUTE_API_LOCAL } from "@/const/constantes.utils";

const fetcher = (url: string) => {
  console.log("Request para API executado:", new Date().toLocaleTimeString());
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  }).then((res) => res.json());
};

export function useCategories() {
  const { data, error, isLoading } = useSWR<ResponseHiper>(
    ROUTE_API_LOCAL,
    fetcher,
    {
      refreshInterval: 600_000, // 10 minutos
      dedupingInterval: 600_000, // evita refetch duplicado por 10 minutos
      revalidateOnFocus: false, // não atualiza só porque voltou para a aba
    }
  );

  console.log("Dados recebidos da API/Cache:", data?.produtos.length);

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
