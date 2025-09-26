import { serviceGetProducts } from "@/lib/services/products.service";
import { ProductHomePage } from "@/components/product-page/ProductHomePage";

export default async function Home() {
  const data = await serviceGetProducts();

  return (
    <>
      <ProductHomePage data={data} />
    </>
  );
}
