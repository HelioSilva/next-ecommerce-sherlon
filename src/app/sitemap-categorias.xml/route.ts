import { ROUTE_API_LOCAL } from "@/const/constantes.utils";
import { ProdutoHiper } from "@/types/productHiper.types";
import { NextResponse } from "next/server";

export async function GET() {
  // Chama sua API para buscar os produtos
  const response = await fetch(
    `https://sherlonjoias.com.br/${ROUTE_API_LOCAL}`,
    {
      next: { revalidate: 60 * 60 }, // revalida 1x por hora
    }
  );
  const responseJson: any = await response.json();

  const cats: string[] = Array.from(
    new Set(
      responseJson.produtos
        .filter((prod: ProdutoHiper) => prod.quantidadeEmEstoque > 0)
        .map((item: ProdutoHiper) => item.categoria)
        .filter((cat: any): cat is string => !!cat && cat.trim() !== "")
    )
  );

  // Gera o XML de cada categoria
  const categoriasXml = cats
    .map(
      (c) => `
    <url>
      <loc>https://sherlonjoias.com.br/shop?categoria=${encodeURIComponent(
        c.toLowerCase().replace(/\s+/g, "-")
      )}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>
  `
    )
    .join("");

  // Gera o XML do sitemap completo
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${categoriasXml}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
