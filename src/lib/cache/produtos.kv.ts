import { Product } from "@/types/product.types";
import { Redis } from "@upstash/redis"; // Troque o @vercel/kv por este

const redis = Redis.fromEnv(); // Inicializa o cliente Upstash

const KEY_PRODUTOS = "produtos";
const KEY_PONTO = "pontoSync";
const KEY_CATEGORIAS = "categorias";
const KEY_NOVIDADES = "novidades";
const KEY_MAISVENDIDOS = "maisvendidos";

export async function getCachePontoSincronizacao() {
  const pontoSync = (await redis.get<number>(KEY_PONTO)) || 0;
  return pontoSync;
}

export async function getCacheProdutos(): Promise<Product[]> {
  const produtos = (await redis.get<Product[]>(KEY_PRODUTOS)) || [];
  console.log(`Cache recuperado: ${produtos.length} produtos.`);
  return produtos;
}

export async function getCacheCategorias(): Promise<string[]> {
  const categorias = (await redis.get<string[]>(KEY_CATEGORIAS)) || [];
  console.log(`Cache recuperado: ${categorias.length} categorias.`);
  return categorias;
}

export async function getCacheNovidades(): Promise<Product[]> {
  const novidades = (await redis.get<Product[]>(KEY_NOVIDADES)) || [];
  console.log(`Cache recuperado: ${novidades.length} novidades.`);
  return novidades;
}

export async function getCacheMaisVendidos(): Promise<Product[]> {
  const maisVendidos = (await redis.get<Product[]>(KEY_MAISVENDIDOS)) || [];
  console.log(`Cache recuperado: ${maisVendidos.length} mais vendidos.`);
  return maisVendidos;
}

export async function saveCache(
  produtos: Product[],
  pontoSync: number,
  categorias: string[],
  maisVendidos: Product[],
  novidades: Product[],
) {
  try {
    //{ ex: 60 * 60 * 8 } = 8 horas
    // Salvando no Redis (sem limites de 2MB do fetch do Next.js)
    await redis.set(KEY_PRODUTOS, produtos, { ex: 60 * 60 * 8 });
    await redis.set(KEY_PONTO, pontoSync, { ex: 60 * 60 * 8 });
    await redis.set(KEY_CATEGORIAS, categorias, { ex: 60 * 60 * 8 });
    await redis.set(KEY_MAISVENDIDOS, maisVendidos, { ex: 60 * 60 * 8 });
    await redis.set(KEY_NOVIDADES, novidades, { ex: 60 * 60 * 8 });
    console.log("Cache salvo no Upstash com sucesso.");
  } catch (error) {
    console.error("Erro ao salvar no Redis:", error);
  }
}
