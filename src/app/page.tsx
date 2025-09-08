"use client";

import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/homepage/Header";
import { useProdutos } from "@/lib/hooks/useProducts";

export default function Home() {
  const { novidades } = useProdutos("Novidades");
  const { maisvendidos } = useProdutos("MaisVendidos");

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
        {/* <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div> */}
        {/* <Reviews data={reviewsData} /> */}
      </main>
    </>
  );
}
