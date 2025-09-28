import {
  DESCRICAO_TAMANHO_PADRAO,
  ROUTE_API_LOCAL,
} from "@/const/constantes.utils";
import { Product } from "@/types/product.types";
import { ProdutoHiper } from "@/types/productHiper.types";
import { ResponseDataAPI } from "@/types/responseDataAPI.types";
import { converterUnidadeMedida, toCapitalCase } from "../utils";

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

export async function serviceGetCategories(): Promise<string[]> {
  const res = await fetch("https://sherlonjoias.com.br/" + ROUTE_API_LOCAL, {
    next: { revalidate: 600 }, // ISR -> revalida a cada 10 minutos
  });

  if (!res.ok) return [];

  const data = await res.json();

  if (!data?.produtos) {
    return [];
  }

  const cats: string[] = Array.from(
    new Set(
      data.produtos
        .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
        .map((item: ProdutoHiper) => item.categoria)
        .filter((cat: any): cat is string => !!cat && cat.trim() !== "")
    )
  );

  return cats.sort((a: any, b: any) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })
  );
}

export async function serviceGetProducts({
  category,
  pesquisaProduto,
}: {
  category?: string;
  pesquisaProduto?: string;
}): Promise<ResponseDataAPI> {
  const res = await fetch("https://sherlonjoias.com.br/" + ROUTE_API_LOCAL, {
    next: { revalidate: 600 }, // ISR -> revalida a cada 10 minutos
  });

  if (!res.ok)
    return {
      produtos: [],
      maisVendidos: [],
      novidades: [],
      isLoading: false,
      error: null,
    };

  const data = await res.json();

  if (!data?.produtos) {
    return {
      produtos: [],
      maisVendidos: [],
      novidades: [],
      isLoading: false,
      error: null,
    };
  }

  if (category) {
    if (category == "Novidades") {
      return {
        produtos: data.produtos
          .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
          .sort((a: any, b: any) => b.codigo - a.codigo)
          .slice(0, 24)
          .map(convertHiperProductToProduct),
        maisVendidos: [],
        novidades: [],
        isLoading: false,
        error: null,
      };
    }
    return {
      produtos: data.produtos
        .filter(
          (prod: ProdutoHiper) =>
            prod.quantidadeEmEstoque > 0 &&
            prod.categoria
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .includes(category)
        )
        .map(convertHiperProductToProduct),
      maisVendidos: [],
      novidades: [],
      isLoading: false,
      error: null,
    };
  }

  if (pesquisaProduto && pesquisaProduto.trim() != "") {
    return {
      produtos: data.produtos
        .filter(
          (prod: ProdutoHiper) =>
            prod.quantidadeEmEstoque > 0 &&
            prod.nome?.toLowerCase().includes(pesquisaProduto.toLowerCase())
        )
        .sort((a: any, b: any) => b.codigo - a.codigo)
        .map(convertHiperProductToProduct),
      maisVendidos: [],
      novidades: [],
      isLoading: false,
      error: null,
    };
  }

  return {
    produtos: data.produtos
      .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
      .map(convertHiperProductToProduct),
    novidades: data.produtos
      .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
      .sort((a: any, b: any) => b.codigo - a.codigo)
      .slice(0, 24)
      .map(convertHiperProductToProduct),
    maisVendidos: data?.produtos
      ? data.produtos
          .filter(
            (prod: ProdutoHiper) =>
              prod.marca == "SHERLON" && prod.quantidadeEmEstoque > 0
          )
          .map(convertHiperProductToProduct)
          .slice(4, 24)
      : [],
    isLoading: false,
    error: null,
  };
}
