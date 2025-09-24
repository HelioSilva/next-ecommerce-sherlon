"use client";

import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
      {data?.gallery && data.gallery.length > 0 && (
        <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center">
          {data.gallery.map((photo, index) => (
            <button
              key={index}
              type="button"
              className="bg-[#F0EEED] rounded-[13px] xl:rounded-[20px] w-full max-w-[111px] xl:max-w-[152px] max-h-[106px] xl:max-h-[167px] xl:min-h-[167px] aspect-square overflow-hidden"
              onClick={() => setSelected(photo.imagem)}
            >
              <Image
                src={photo.imagem}
                width={152}
                height={167}
                className="rounded-md w-full h-full object-cover hover:scale-110 transition-all duration-500"
                alt={data.title}
                priority
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative  flex items-center justify-center bg-[#F0EEED] rounded-[13px] sm:rounded-[20px] w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0">
        {data.stock <= 0 ? (
          <Badge variant="destructive" className="absolute top-3 left-3">
            Produto esgotado
          </Badge>
        ) : (
          <Badge variant="secondary" className="absolute top-3 left-3">
            Vendido por {data.unitOfMeasure}
          </Badge>
        )}
        <Zoom>
          <Image
            src={selected}
            width={444}
            height={530}
            className="rounded-md"
            alt={data.title}
            priority
            unoptimized
          />
        </Zoom>
      </div>
    </div>
  );
};

export default PhotoSection;
