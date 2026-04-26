import { NextResponse } from "next/server";
import { syncProdutos } from "@/lib/services/syncProdutos";

export async function GET() {
  console.log("GET");

  const produtos = await syncProdutos();
  console.log("Produtos encontrados: ");

  if (produtos == null) {
    return NextResponse.json([]);
  }

  return NextResponse.json(produtos);
}
