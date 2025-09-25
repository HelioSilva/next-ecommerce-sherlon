import { Product } from "@/types/product.types";
import { useMemo } from "react";
import { ProdutoHiper } from "@/types/productHiper.types";
import { ResponseHiper } from "@/types/responseHiper.types";
import { converterUnidadeMedida, toCapitalCase } from "@/lib/utils";
import {
  DESCRICAO_TAMANHO_PADRAO,
  ROUTE_API_LOCAL,
} from "@/const/constantes.utils";
import { fetcher } from "@/lib/fetcher";
import { useProdutosData } from "./useProdutosData";

export const convertHiperProductToProduct = (prod: ProdutoHiper): Product => ({
  id: prod.codigo,
  title: toCapitalCase(prod.nome),
  srcUrl: prod.imagem ? prod.imagem : "/images/semimagem.png",
  price: prod.preco,
  gallery: prod.imagensAdicionais.length > 0 ? prod.imagensAdicionais : [],
  discount: { amount: 0, percentage: 0 },
  rating: 4.5,
  stock: prod.quantidadeEmEstoque,
  sizes:
    prod.descricao && prod.descricao.split(",").length > 1
      ? prod.descricao.split(",")
      : [DESCRICAO_TAMANHO_PADRAO],
  unitOfMeasure: converterUnidadeMedida(prod.unidade),
  categoria: prod.categoria || "",
});

export function useProdutos(category?: string): {
  produtos: Product[];
  isLoading: boolean;
  error: any;
} {
  const { data, error, isLoading } = useProdutosData();

  const produtos = useMemo(() => {
    if (!data?.produtos) {
      return [];
    }

    if (category && category.includes("Novidades")) {
      return data.produtos
        .filter((it) => it.quantidadeEmEstoque > 0)
        .sort((a, b) => b.codigo - a.codigo) // ordena antes de map
        .slice(0, 24) // pega os 24 mais recentes
        .map(convertHiperProductToProduct);
    }

    if (category && category.includes("MaisVendidos")) {
      return data.produtos
        .filter(
          (prod: ProdutoHiper) =>
            prod.marca == "SHERLON" && prod.quantidadeEmEstoque > 0
        )
        .slice(4, 8)
        .map(convertHiperProductToProduct);
    }

    const produtosFiltrados = category
      ? data.produtos.filter((prod: ProdutoHiper) =>
          prod.categoria?.toLowerCase().replace(/\s+/g, "-").includes(category)
        )
      : data.produtos;

    return produtosFiltrados
      ? produtosFiltrados
          .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
          .map((prod: ProdutoHiper) => convertHiperProductToProduct(prod))
      : [];
  }, [data, category]);

  return {
    produtos,
    isLoading,
    error,
  };
}
