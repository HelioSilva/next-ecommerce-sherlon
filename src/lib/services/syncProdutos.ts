import {
  getCacheCategorias,
  getCacheMaisVendidos,
  getCacheNovidades,
  getCachePontoSincronizacao,
  getCacheProdutos,
  saveCache,
} from "@/lib/cache/produtos.kv";
import { Product } from "@/types/product.types";
import { Redis } from "@upstash/redis";
import { convertHiperProductToProduct } from "./products.service";

// Inicializa o cliente com as variáveis de ambiente padrão do Upstash/Vercel
const redis = Redis.fromEnv();

const API_URL =
  "https://ms-ecommerce.hiper.com.br/api/v1/produtos/pontoDeSincronizacao";

export async function syncCategorias() {
  return await getCacheCategorias();
}

export async function syncNovidades() {
  return await getCacheNovidades();
}

export async function syncMaisVendidos() {
  return await getCacheMaisVendidos();
}

export async function syncProdutos() {
  const produtos = await getCacheProdutos();

  // ⛔ Evita sync a cada request
  if (produtos.length > 0) {
    return produtos;
  }

  const clientId = process.env.SECRET_KEY ?? "";

  try {
    const apiTokenRes = await fetch(
      `http://ms-ecommerce.hiper.com.br/api/v1/auth/gerar-token/${clientId}`,
      { cache: "no-store" },
    );

    const dataToken = await apiTokenRes.json();
    const pontoSync = await getCachePontoSincronizacao();

    const res = await fetch(`${API_URL}?pontoDeSincronizacao=${pontoSync}`, {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const payloadProdutos: Product[] = data.produtos.map(
      convertHiperProductToProduct,
    );
    const categorias = await getCacheCategorias();

    // Set para busca rápida
    const categoriasExistentes = new Set(categorias);

    // 2. Categorias vindas da API
    const categoriasAPI: string[] = Array.from(
      new Set(
        payloadProdutos
          .filter((item) => item.stock > 0)
          .map((item) => item.categoria)
          .filter((cat: any): cat is string => !!cat && cat.trim() !== ""),
      ),
    );

    // 3. Apenas novas (incremental puro)
    // const categoriasNovas = categoriasAPI.filter(
    //   (cat) => !categoriasExistentes.has(cat),
    // );

    // Sincronização de produtos
    // const mapa = new Map(payloadProdutos.map((p: Product) => [p.id, p]));

    // for (const prod of payloadProdutos || []) {
    //   mapa.set(prod.id, prod);
    // }

    // const novosProdutos = Array.from(mapa.values());
    const novidades = payloadProdutos.slice(-40);
    const maisvendidos = payloadProdutos.filter(
      (item) => item.marca == "SHERLON" && item.stock > 0,
    );

    // Atualiza o cache local e o timestamp no Redis
    await saveCache(
      payloadProdutos,
      data.pontoDeSincronizacao,
      categoriasAPI,
      maisvendidos,
      novidades,
    );

    // Atualiza o lastSync no Redis para controlar o próximo intervalo
    await redis.set("lastSync", Date.now());

    return payloadProdutos;
  } catch (error) {
    console.error("Erro na sincronização:", error);
    return produtos;
  }
}
