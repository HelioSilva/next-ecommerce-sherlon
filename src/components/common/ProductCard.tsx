import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { formatarPreco } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiShoppingCart, FiStar } from "react-icons/fi";

interface ProductCardProps {
  data: Product;
}

export default function ProductCard({ data }: ProductCardProps) {
  const { id, title, srcUrl, price, discount, rating, stock } = data;

  const hasDiscount = discount.percentage > 0 || discount.amount > 0;
  const finalPrice = hasDiscount
    ? price -
      (discount.amount > 0
        ? discount.amount
        : price * (discount.percentage / 100))
    : price;

  const isOutOfStock = false; //stock <= 0;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-sm transition-all hover:shadow-md">
      <Link
        href={`/shop/product/${id}/${title.split(" ").join("-")}`}
        className="cursor-pointer"
        aria-label={title}
      >
        <div className="aspect-square overflow-hidden bg-gray-100">
          <Image
            src={srcUrl}
            alt={title}
            width={300}
            height={300}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
            unoptimized
          />
        </div>
        {hasDiscount && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            {discount.percentage > 0 ? `${discount.percentage}% OFF` : "Oferta"}
          </Badge>
        )}
        {isOutOfStock && (
          <Badge variant="secondary" className="absolute top-3 left-3">
            Esgotado
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-3 left-3">
          Vendido por {data.unitOfMeasure}
        </Badge>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="text-base font-medium text-coffee-900">
            <Link href={`/shop/product/${id}/${title.split(" ").join("-")}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          {/* <div className="mt-1 flex items-center text-sm">
            <FiStar className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
          </div> */}
        </div>

        <div className="mt-4 flex items-baseline space-x-2">
          <p className="text-lg font-semibold text-coffee-900">
            {formatarPreco(finalPrice)}
          </p>
          {hasDiscount && (
            <p className="text-sm text-gray-500 line-through">
              {formatarPreco(price)}
            </p>
          )}
        </div>

        <Button
          variant="default"
          size="sm"
          className="mt-4 w-full border-transparent bg-coffee text-white hover:bg-coffee/90"
          disabled={isOutOfStock}
        >
          <FiShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Indisponível" : "Adicionar ao Carrinho"}
        </Button>
      </div>
    </div>
  );
}
