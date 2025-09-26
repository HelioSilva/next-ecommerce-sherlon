import { MetadataRoute } from "next";
import { ROUTE_API_LOCAL } from "@/const/constantes.utils";
import { ProdutoHiper } from "@/types/productHiper.types";
import { convertHiperProductToProduct } from "@/lib/services/products.service";
import { Product } from "@/types/product.types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Chama sua API para buscar os produtos
  const res = await fetch(`https://sherlonjoias.com.br/${ROUTE_API_LOCAL}`, {
    next: { revalidate: 60 * 60 }, // revalida 1x por hora
  });
  const responseJson: any = await res.json();

  const data: Product[] = responseJson.produtos
    .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
    .map(convertHiperProductToProduct);

  // URLs fixas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://www.sherlonjoias.com.br/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://sherlonjoias.com.br/shop?categoria=Novidades",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // URLs dinâmicas (produtos)
  const productRoutes: MetadataRoute.Sitemap = data.map((product) => ({
    url: `https://sherlonjoias.com.br/shop/product/${product.id}/${product.title}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
