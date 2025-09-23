import ProductCard from "@/components/common/ProductCard";
import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/homepage/Header";
import ScrollInfinito from "@/components/template/ScrollInfinito";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { serviceGetProducts } from "@/lib/services/products.service";

export default async function Home() {
  const QTD_PRODUTOS_CARREGADOS_SERVER_SIDE = 45;
  const data = await serviceGetProducts();

  return (
    <>
      <Header />

      {/* <Brands /> */}
      <main className="bg-[#FFF] text-[#685048] py-[50px] sm:py-[72px]">
        {data.novidades.length > 0 && (
          <ProductListSec
            title="NOVIDADES"
            data={data.novidades}
            viewAllLink="/shop#novidades"
          />
        )}
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          {data.maisVendidos.length > 0 && (
            <ProductListSec
              title="Mais Vendidos"
              data={data.maisVendidos}
              viewAllLink="/shop?categoria=MaisVendidos"
            />
          )}
        </div>
        <div className="mb-[50px] sm:mb-20">
          <div className="max-w-frame mx-auto px-4 xl:px-0">
            <div className="flex md:space-x-5 items-start">
              {data.produtos.length > 0 && (
                <section className="max-w-frame mx-auto text-center">
                  <motion.h2
                    initial={{ y: "100px", opacity: 0 }}
                    whileInView={{ y: "0", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={cn([
                      integralCF.className,
                      "text-[32px] md:text-5xl mb-8 md:mb-14 capitalize",
                    ])}
                  >
                    Joias
                  </motion.h2>
                  <div className="flex md:space-x-5 items-start">
                    <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                      {data.produtos
                        .slice(0, QTD_PRODUTOS_CARREGADOS_SERVER_SIDE)
                        .map((product) => (
                          <ProductCard key={product.id} data={product} />
                        ))}
                    </div>
                    <hr className="border-t-black/10" />
                  </div>
                  <ScrollInfinito
                    initialItem={QTD_PRODUTOS_CARREGADOS_SERVER_SIDE}
                    category=""
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
