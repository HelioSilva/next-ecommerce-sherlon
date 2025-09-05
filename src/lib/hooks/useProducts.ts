import useSWR from "swr";
import { Product } from "@/types/product.types";
import { ProdutoHiper } from "@/types/productHiper.types";
import { ResponseHiper } from "@/types/responseHiper.types";
import { toCapitalCase } from "@/lib/utils";
import { ROUTE_API_LOCAL } from "@/const/constantes.utils";

const fetcher = (url: string) => {
  console.log("Request para API executado:", new Date().toLocaleTimeString());
  return fetch(url).then((res) => res.json());
};

const convertHiperProductToProduct = (prod: ProdutoHiper): Product => ({
  id: prod.codigo,
  title: toCapitalCase(prod.nome),
  srcUrl: prod.imagem ? prod.imagem : "/images/semimagem.png",
  price: prod.preco,
  gallery: prod.imagensAdicionais.length > 0 ? prod.imagensAdicionais : [],
  discount: { amount: 0, percentage: 0 },
  rating: 4.5,
  stock: prod.quantidadeEmEstoque ?? 0,
});

export function useProdutos(category?: string): {
  produtos: Product[];
  novidades: Product[];
  maisvendidos: Product[];
  isLoading: boolean;
  error: any;
} {
  console.log("Hook useProdutos chamado com/sem categoria:", category);
  const { data, error, isLoading } = useSWR<ResponseHiper>(
    ROUTE_API_LOCAL,
    fetcher,
    {
      refreshInterval: 600_000, // 10 minutos
      dedupingInterval: 600_000, // evita refetch duplicado por 10 minutos
      revalidateOnFocus: false, // não atualiza só porque voltou para a aba
    }
  );

  if (category && category.includes("Novidades")) {
    return {
      produtos: [],
      novidades: data?.produtos
        ? data.produtos
            .sort((a, b) => b.codigo - a.codigo)
            .slice(0, 10)
            .map(convertHiperProductToProduct)
        : [],
      maisvendidos: [],
      isLoading,
      error,
    };
  }

  if (category && category.includes("MaisVendidos")) {
    return {
      produtos: [],
      novidades: [],
      maisvendidos: data?.produtos
        ? data.produtos
            .filter((prod: ProdutoHiper) => prod.marca == "SHERLON")
            .map(convertHiperProductToProduct)
        : [],
      isLoading,
      error,
    };
  }

  console.log("Dados recebidos da API/Cache:", data?.produtos.length);
  const produtosFiltrados = category
    ? data?.produtos.filter((prod: ProdutoHiper) =>
        prod.categoria?.toLowerCase().replace(/\s+/g, "-").includes(category)
      )
    : data?.produtos;

  const produtos: Product[] = produtosFiltrados
    ? produtosFiltrados.map((prod: ProdutoHiper) =>
        convertHiperProductToProduct(prod)
      )
    : [];

  const novidades: Product[] = !category ? produtos.slice(-8) : [];
  const maisvendidos: Product[] = !category ? produtos.slice(4, 8) : [];

  return {
    produtos,
    novidades,
    maisvendidos,
    isLoading,
    error,
  };
}
