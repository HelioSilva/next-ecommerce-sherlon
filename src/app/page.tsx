"use client";

import ProductCard from "@/components/common/ProductCard";
import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/homepage/Header";
import ScrollInfinito from "@/components/template/ScrollInfinito";
import { useProdutos } from "@/lib/hooks/useProducts";
import { useEffect, useRef, useState } from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Image from "next/image";

export default function Home() {
  const { produtos: novidades } = useProdutos("Novidades");
  const { produtos: maisvendidos } = useProdutos("MaisVendidos");
  const { produtos, isLoading } = useProdutos("");

  const QTD_PRODUTOS_VISIVEIS = parseInt(
    process.env.NEXT_PUBLIC_PRODUTOS_VISIVEIS_POR_LOADING || "10",
    10
  );

  const [visibleCount, setVisibleCount] = useState(QTD_PRODUTOS_VISIVEIS);

  const loader = useRef(null);

  useEffect(() => {
    setVisibleCount(QTD_PRODUTOS_VISIVEIS);
  }, [QTD_PRODUTOS_VISIVEIS]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setTimeout(() => {
            setVisibleCount((prev) => prev + QTD_PRODUTOS_VISIVEIS);
          }, 500);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [produtos.length]);

  return (
    <>
      <Header />

      {/* <Brands /> */}
      <main className="bg-[#FFF] text-[#685048] py-[50px] sm:py-[72px]">
        {novidades.length > 0 && (
          <ProductListSec
            title="NOVIDADES"
            data={novidades}
            viewAllLink="/shop#novidades"
          />
        )}
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          {maisvendidos.length > 0 && (
            <ProductListSec
              title="Mais Vendidos"
              data={maisvendidos}
              viewAllLink="/shop?categoria=MaisVendidos"
            />
          )}
        </div>
        <div className="mb-[50px] sm:mb-20">
          <div className="max-w-frame mx-auto px-4 xl:px-0">
            <div className="flex md:space-x-5 items-start">
              {isLoading && (
                <section className="max-w-frame mx-auto text-center">
                  <Image
                    src="/images/loading.svg"
                    alt="Loading..."
                    width={128}
                    height={128}
                  />
                </section>
              )}
              {produtos.length > 0 && (
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
                    <ScrollInfinito
                      loading={visibleCount < produtos.length}
                      loaderRef={loader}
                    >
                      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                        {produtos.slice(0, visibleCount).map((product) => (
                          <ProductCard key={product.id} data={product} />
                        ))}
                      </div>
                      <hr className="border-t-black/10" />
                    </ScrollInfinito>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
