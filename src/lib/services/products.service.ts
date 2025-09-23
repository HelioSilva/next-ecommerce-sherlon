import { ROUTE_API_LOCAL } from "@/const/constantes.utils";
import { Product } from "@/types/product.types";
import { convertHiperProductToProduct } from "../hooks/useProducts";
import { ProdutoHiper } from "@/types/productHiper.types";

export async function serviceGetProducts(category?: string): Promise<{
  produtos: Product[];
  novidades: Product[];
  maisVendidos: Product[];
}> {
  const res = await fetch("https://sherlonjoias.com.br/" + ROUTE_API_LOCAL, {
    next: { revalidate: 600 }, // ISR -> revalida a cada 10 minutos
  });

  if (!res.ok)
    return {
      produtos: [],
      maisVendidos: [],
      novidades: [],
    };

  const data = await res.json();

  if (category) {
    return {
      produtos: data?.produtos.filter((prod: ProdutoHiper) =>
        prod.categoria?.toLowerCase().replace(/\s+/g, "-").includes(category)
      ),
      maisVendidos: [],
      novidades: [],
    };
  }

  return {
    produtos: data?.produtos
      ? data.produtos.map(convertHiperProductToProduct)
      : [],
    novidades: data?.produtos
      ? data.produtos
          .sort((a: any, b: any) => b.codigo - a.codigo)
          .slice(0, 24)
          .map(convertHiperProductToProduct)
          .slice(-24)
      : [],
    maisVendidos: data?.produtos
      ? data.produtos
          .filter((prod: ProdutoHiper) => prod.marca == "SHERLON")
          .map(convertHiperProductToProduct)
          .slice(4, 24)
      : [],
  };
}
