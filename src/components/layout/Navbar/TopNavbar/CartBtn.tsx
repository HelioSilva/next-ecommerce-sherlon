"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { formatarPreco } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartBtn = () => {
  const { cart, totalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );

  return (
    <Link href="/cart" className="relative mr-[14px] p-1 flex items-center justify-between rounded">
      <img
        src="/icons/cart.svg"
        height={100}
        width={100}
        alt="cart"
        className="max-w-[22px] max-h-[22px]"
      />
      {cart && cart.totalQuantities > 0 && (
        <span className="border bg-black text-white rounded-full w-fit-h-fit px-1 text-xs absolute -top-3 ml-3 left-1 -translate-x-1/2">
          {cart.totalQuantities}
        </span>
      )}

      {cart && cart.totalQuantities > 0 && (
        <span className="ml-3 text-black font-medium whitespace-nowrap">
          {formatarPreco(totalPrice)}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
