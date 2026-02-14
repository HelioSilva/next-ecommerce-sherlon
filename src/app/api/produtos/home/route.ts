import { NextResponse } from "next/server"
import { getTodosProdutosApiHiper } from "@/lib/produtos"

export async function GET() {
  const produtos = await getTodosProdutosApiHiper()

  if (produtos == null){
    return NextResponse.json([])
  }

  return NextResponse.json(produtos)
}