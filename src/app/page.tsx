"use client";

import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { useProdutos } from "@/lib/hooks/useProducts";
import { toCapitalCase } from "@/lib/utils";
import { Product } from "@/types/product.types";
import { ProdutoHiper } from "@/types/productHiper.types";
import { ResponseHiper } from "@/types/responseHiper.types";
import { Review } from "@/types/review.types";
// pages/index.tsx
import { GetStaticProps } from "next";
import { title } from "process";

export default function Home() {
  const { produtos, isLoading, error } = useProdutos();

  let prodMaisVendidos = produtos.slice(4, 8);
  let prodNovidade = produtos.slice(-8);

  return (
    <>
      <Header />
      {/* <Brands /> */}
      <main className="bg-[#FFF] text-[#685048] py-[50px] sm:py-[72px]">
        {prodNovidade.length > 0 && (
          <ProductListSec
            title="NOVIDADES"
            data={prodNovidade}
            viewAllLink="/shop#novidades"
          />
        )}
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          {prodMaisVendidos.length > 0 && (
            <ProductListSec
              title="Mais Vendidos"
              data={prodMaisVendidos}
              viewAllLink="/shop#maisvendidos"
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
