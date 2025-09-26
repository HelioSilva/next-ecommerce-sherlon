import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { serviceGetProducts } from "@/lib/services/products.service";
import { ResponseDataAPI } from "@/types/responseDataAPI.types";

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const data: ResponseDataAPI = await serviceGetProducts();

  const productData = data.produtos.find(
    (product) => product.id === Number(params.slug[0])
  );

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        {productData != undefined ? (
          <BreadcrumbProduct title={productData.title} />
        ) : (
          <>
            <Skeleton width={250} />

            <div className="flex flex-col space-x-[10px]">
              <div className="h-[2px]">
                <Skeleton height={300} />
              </div>
              <div className="h-[2px]">
                <Skeleton height={300} />
              </div>
            </div>
          </>
        )}

        <section className="mb-11">
          {/* {isLoading && <Loading />} */}
          {productData != undefined && <Header data={productData} />}
        </section>
        <Tabs />
      </div>
    </main>
  );
}
