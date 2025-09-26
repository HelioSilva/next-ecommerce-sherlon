import { ProductCategoryPage } from "@/components/product-page/ProductCategoryPage";
import { serviceGetProducts } from "@/lib/services/products.service";

interface PageProps {
  searchParams: { categoria?: string };
}

export default async function ShopPage({ searchParams }: PageProps) {
  const nomeCategoria = searchParams.categoria || "";
  const data = await serviceGetProducts(nomeCategoria);

  console.log(data.produtos.length + " produtos na categoria.");

  return <ProductCategoryPage data={data} nomeCategoria={nomeCategoria} />;
}
