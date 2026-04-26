import { DESCRICAO_TAMANHO_PADRAO } from "@/const/constantes.utils";
import { Product } from "@/types/product.types";
import { ProdutoHiper } from "@/types/productHiper.types";
import { ResponseDataAPI } from "@/types/responseDataAPI.types";
import { converterUnidadeMedida, toCapitalCase } from "../utils";
import { syncCategorias, syncProdutos } from "./syncProdutos";
import { getCacheNovidades } from "../cache/produtos.kv";

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
  marca: prod.marca || "",
});

export async function serviceGetCategories(): Promise<string[]> {
  const categorias = await syncCategorias();

  return categorias.sort((a: any, b: any) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" }),
  );
}

export async function serviceGetProductsByCategory(
  category: string,
): Promise<Product[]> {
  if (category == "Novidades") {
    const novidades = await getCacheNovidades();
    return novidades;
  }

  const produtos = await syncProdutos();
  return produtos.filter(
    (prod) =>
      prod.stock > 0 &&
      prod.categoria?.toLowerCase().replace(/\s+/g, "-").includes(category),
  );
}

export async function serviceGetProductsBySlug(
  slug: string,
): Promise<Product | undefined> {
  const produtos = await syncProdutos();
  return produtos.find((product) => product.id === Number(slug));
}

export async function serviceGetProductsByName(
  name: string,
): Promise<Product[]> {
  const produtos = await syncProdutos();
  return produtos
    .filter(
      (prod) =>
        prod.stock > 0 &&
        (prod.title?.toLowerCase().includes(name.toLowerCase()) ||
          prod.id == Number(name)),
    )
    .sort((a: any, b: any) => b.codigo - a.codigo);
}

export async function serviceGetAllProducts(): Promise<Product[]> {
  const produtos = await syncProdutos();
  return produtos.sort((a: any, b: any) => b.codigo - a.codigo);
}
