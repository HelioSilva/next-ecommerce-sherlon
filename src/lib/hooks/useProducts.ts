import { Product } from "@/types/product.types";
import { useMemo } from "react";
import { ProdutoHiper } from "@/types/productHiper.types";
import { converterUnidadeMedida, toCapitalCase } from "@/lib/utils";
import { DESCRICAO_TAMANHO_PADRAO } from "@/const/constantes.utils";
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

export function useProdutos(
  category?: string,
  buscarNome?: string
): {
  produtos: Product[];
  isLoading: boolean;
  error: any;
} {
  const { data, error, isLoading } = useProdutosData();

  const produtos = useMemo(() => {
    if (!data?.produtos) {
      return [];
    }

    let produtosProcessados: ProdutoHiper[] = [];

    if (category && category.includes("Novidades")) {
      produtosProcessados = data.produtos
        .filter((it) => it.quantidadeEmEstoque > 0)
        .sort((a, b) => b.codigo - a.codigo)
        .slice(0, 24);
    } else if (category && category.includes("MaisVendidos")) {
      produtosProcessados = data.produtos
        .filter(
          (prod: ProdutoHiper) =>
            prod.marca == "SHERLON" && prod.quantidadeEmEstoque > 0
        )
        .slice(4, 8);
    } else if (category && category != "") {
      produtosProcessados = data.produtos.filter((prod: ProdutoHiper) =>
        prod.categoria?.toLowerCase().replace(/\s+/g, "-").includes(category)
      );
    } else {
      produtosProcessados = data.produtos;
    }

    // Aplica o filtro de busca por nome se `buscarNome` for fornecido
    if (buscarNome && buscarNome.trim() !== "") {
      console.log("filtro:" + buscarNome);
      produtosProcessados = produtosProcessados.filter((prod) =>
        prod.nome.toLowerCase().includes(buscarNome.toLowerCase())
      );
      console.log(produtosProcessados.length);
    }

    // Filtro final de estoque e conversão para o tipo Product
    return produtosProcessados
      .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
      .map(convertHiperProductToProduct);
  }, [data, category, buscarNome]);

  return {
    produtos,
    isLoading,
    error,
  };
}
