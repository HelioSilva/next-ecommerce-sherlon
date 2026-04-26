import {
  serviceGetAllProducts,
  serviceGetProductsByName,
} from "@/lib/services/products.service";
import { ProductHomePage } from "@/components/product-page/ProductHomePage";
import { syncMaisVendidos, syncNovidades } from "@/lib/services/syncProdutos";
import { Product } from "@/types/product.types";

export interface PageProps {
  searchParams: { busca?: string };
}

export default async function Home({ searchParams }: PageProps) {
  const { busca } = searchParams;

  const data: Product[] = busca
    ? await serviceGetProductsByName(busca)
    : await serviceGetAllProducts();
  const novidades = await syncNovidades();
  const maisVendidos = await syncMaisVendidos();
  return (
    <ProductHomePage
      data={data}
      dataNovidades={novidades}
      dataMaisVendido={maisVendidos}
      txtPesquisa={busca}
    />
  );
}
