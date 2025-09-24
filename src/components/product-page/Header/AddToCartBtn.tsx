"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import React from "react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );

  return (
    <button
      type="button"
      className="bg-[#685048] w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-[#685048]/80 transition-all
             disabled:bg-[#a89a95] disabled:text-white/70 disabled:cursor-not-allowed"
      disabled={data.stock <= 0}
      onClick={() =>
        dispatch(
          addToCart({
            id: data.id,
            name: data.title,
            srcUrl: data.srcUrl,
            price: data.price,
            attributes: [sizeSelection],
            discount: data.discount,
            quantity: data.quantity,
          })
        )
      }
    >
      Adicionar ao Carrinho
    </button>
  );
};

export default AddToCartBtn;
