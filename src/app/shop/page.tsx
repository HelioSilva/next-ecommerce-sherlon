"use client";

import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import { useProdutos } from "@/lib/hooks/useProducts";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toCapitalCase } from "@/lib/utils";
import ScrollInfinito from "@/components/template/ScrollInfinito";

export default function ShopPage() {
  const [categoria, setCategoria] = useState<string>("");
  const [ordenar, setOrdenar] = useState<string>("most-popular");

  const { produtos } = useProdutos(categoria);
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoriaParam = searchParams.get("categoria");

    if (categoriaParam && categoriaParam.trim() !== "") {
      setCategoria(categoriaParam);
    } else {
      if (categoria !== "") {
        setCategoria("");
      }
    }
  }, [searchParams]);

  // useEffect(() => {
  //   switch (ordenar) {
  //     case "most-popular":
  //       break;
  //     case "low-price":
  //       produtos?.sort((a, b) => a.price - b.price);
  //       break;
  //     case "high-price":
  //       produtos.sort((a, b) => b.price - a.price);
  //       break;
  //     default:
  //       break;
  //   }
  // }, [produtos, ordenar]);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#685048] text-xl">Filtros</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px] text-[#685048]">
                  {toCapitalCase(categoria).replace("-", " ")}
                </h1>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <div className="flex items-center">
                  Ordenar:{" "}
                  <Select defaultValue={ordenar} onValueChange={setOrdenar}>
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Mais Popular</SelectItem>
                      <SelectItem value="low-price">Menor Preço</SelectItem>
                      <SelectItem value="high-price">Maior Preço</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <main className="pb-20">
              <div className="max-w-frame mx-auto px-4 xl:px-0">
                <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
                <BreadcrumbShop />
                <div className="flex md:space-x-5 items-start">
                  <ScrollInfinito initialItem={0} category={categoria} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
