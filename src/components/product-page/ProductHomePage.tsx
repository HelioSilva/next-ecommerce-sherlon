"use client";

import { ResponseDataAPI } from "@/types/responseDataAPI.types";
import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/homepage/Header";
import ScrollInfinito from "@/components/template/ScrollInfinito";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.types";
import { ProductNotFound } from "./ProductNotFound";

export const ProductHomePage = ({
  data,
  txtPesquisa,
}: {
  data: ResponseDataAPI;
  txtPesquisa?: string;
}) => {
  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    setProdutos(data.produtos);
  }, [data]);

  return (
    <>
      {!txtPesquisa && <Header />}

      <main className="bg-[#FFF] text-[#685048] py-[50px] sm:py-[72px]">
        {!txtPesquisa && (
          <>
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
          </>
        )}

        {data.produtos.length == 0 && <ProductNotFound />}
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

                  <ScrollInfinito produtos={produtos} />
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
