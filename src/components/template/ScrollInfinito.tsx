"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProdutos } from "@/lib/hooks/useProducts";
import ProductCard from "../common/ProductCard";
import Loading from "../common/Loading";
import { useBuscarPorDescricao } from "@/lib/hooks/useBuscarPorDescricao";

const QTD_PRODUTOS_VISIVEIS = parseInt(
  process.env.NEXT_PUBLIC_PRODUTOS_VISIVEIS_A_CADA_LOADING ?? "20",
  10
);

const ScrollInfinito = ({
  initialItem,
  category,
}: {
  initialItem: number;
  category: string;
}) => {
  const { descricao } = useBuscarPorDescricao();
  const { produtos, isLoading } = useProdutos(category, descricao);

  const [visibleCount, setVisibleCount] = useState(QTD_PRODUTOS_VISIVEIS);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(QTD_PRODUTOS_VISIVEIS);
  }, [category]);

  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setVisibleCount((prev) => {
            const next = prev + QTD_PRODUTOS_VISIVEIS;
            return Math.min(next, produtos.length);
          });
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(loader.current);

    return () => {
      observer.disconnect();
    };
  }, [produtos]);

  return (
    <div className="flex flex-col w-full space-y-5">
      {/* Lista de produtos */}
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {produtos
          .slice(descricao === "" ? initialItem : 0, visibleCount)
          .map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
      </div>
      <hr className="border-t-black/10" />
      {visibleCount < produtos.length && (
        <div ref={loader} className="flex justify-center items-center py-4">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ScrollInfinito;
