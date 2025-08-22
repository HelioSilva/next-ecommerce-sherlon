import useSWR from "swr";
import { Product } from "@/types/product.types";
import { ProdutoHiper } from "@/types/productHiper.types";
import { ResponseHiper } from "@/types/responseHiper.types";
import { toCapitalCase } from "@/lib/utils";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  }).then((res) => res.json());

export function useProdutos() {
  const { data, error, isLoading } = useSWR<ResponseHiper>(
    process.env.NEXT_PUBLIC_API_URL,
    fetcher,
    { refreshInterval: 60000 }
  );

  const produtos: Product[] = data?.produtos
    ? data.produtos.map((prod: ProdutoHiper) => ({
        id: prod.codigo,
        title: toCapitalCase(prod.nome),
        srcUrl: prod.imagem
          ? prod.imagem
          : "https://hiper-gestao.s3.amazonaws.com/3afd860e-26ec-458f-9212-f8f1604d9354/imagem-de-produto/13d4ea58-87e6-4481-b22a-629bce13b13e/original.jpeg",
        price: prod.preco,
        gallery:
          prod.imagensAdicionais.length > 0 ? prod.imagensAdicionais : [],
        discount: { amount: 0, percentage: 0 },
        rating: 4.5,
      }))
    : [];

  return {
    produtos,
    isLoading,
    error,
  };
}
