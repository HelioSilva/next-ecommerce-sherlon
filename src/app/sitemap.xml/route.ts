import { NextResponse } from "next/server";

export async function GET() {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://sherlonjoias.com.br/sitemap-produtos.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://sherlonjoias.com.br/sitemap-categorias.xml</loc>
    </sitemap>
  </sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
