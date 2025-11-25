import { ROUTE_API_LOCAL } from "@/const/constantes.utils";
import { convertHiperProductToProduct } from "@/lib/services/products.service";
import { Product } from "@/types/product.types";
import { ProdutoHiper } from "@/types/productHiper.types";
import { NextResponse } from "next/server";

// Exemplo de produtos estáticos
const produtos = [
  { id: 1, title: "Anel de Ouro" },
  { id: 2, title: "Brinco de Prata" },
  { id: 3, title: "Colar de Diamante" },
  { id: 4, title: "Pulseira de Ouro" },
];

export async function GET() {
  const res = await fetch(`https://sherlonjoias.com.br/${ROUTE_API_LOCAL}`, {
    cache: "no-store",
  });

  const responseJson: any = await res.json();

  const data: Product[] = responseJson.produtos
    .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
    .map(convertHiperProductToProduct);

  // Gera o XML de cada produto
  const produtosXml = data
    .map(
      (p) => `
    <url>
      <loc>https://sherlonjoias.com.br/shop/product/${
        p.id
      }/${encodeURIComponent(p.title)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `
    )
    .join("");

  // Gera o XML do sitemap completo
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${produtosXml}
  </urlset>`;

  // Retorna a resposta com o XML
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
