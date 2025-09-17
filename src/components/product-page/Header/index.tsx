import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn, formatarPreco } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import ColorSelection from "./ColorSelection";
import SizeSelection from "./SizeSelection";
import AddToCardSection from "./AddToCardSection";

const Header = ({ data }: { data: Product }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={data} />
        </div>
        <div>
          <h1
            className={cn([
              integralCF.className,
              "text-2xl text-coffee md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize",
            ])}
          >
            {data.title}
          </h1>
          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            <span className="font-bold text-coffee text-2xl sm:text-[32px]">
              {formatarPreco(data.price)} <br />
              {/* <span className="text-[#737373] md:text-lg sm:text-[32px]">Preço por unidade</span> */}
            </span>
          </div>
          <p className="text-sm sm:text-base text-coffee/60 mb-5">
            {"COD. "+data.id}
          </p>
          <SizeSelection sizes={data.sizes} />
          <hr className="hidden md:block h-[1px] border-t-coffee/10 my-5" />
          <AddToCardSection data={data} />
        </div>
      </div>
    </>
  );
};

export default Header;
