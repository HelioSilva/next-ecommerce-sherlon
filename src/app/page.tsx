import { serviceGetProducts } from "@/lib/services/products.service";
import { ProductHomePage } from "@/components/product-page/ProductHomePage";
import { ResponseDataAPI } from "@/types/responseDataAPI.types";

export interface PageProps {
  searchParams: { busca?: string };
}

export default async function Home({ searchParams }: PageProps) {
  const { busca } = searchParams;

  const data: ResponseDataAPI = await serviceGetProducts(
    busca ? { pesquisaProduto: busca } : {}
  );
  return <ProductHomePage data={data} txtPesquisa={busca} />;
}
