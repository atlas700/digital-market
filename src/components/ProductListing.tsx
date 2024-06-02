"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { Skeleton } from "./ui/skeleton";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const label = PRODUCT_CATEGORIES.find(
    (prod) => prod.value === product?.category
  )?.label;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  const productImages = product?.images
    .map(({ image }) => {
      if (typeof image === "string") return image;
      else return image.url;
    })
    .filter(Boolean) as string[];

  if (!product || !isVisible) {
    return <ProductPlaceHolder />;
  }
  if (isVisible && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("invisible w-full h-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={productImages} />
          <h3 className="mt-4 font-semibold text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="text-sm mt-1 text-gray-500">{label}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

const ProductPlaceHolder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full aspect-square bg-zinc-100 overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="w-2/3 mt-4 h-4 rounded-lg" />
      <Skeleton className="w-16 mt-2 h-4 rounded-lg" />
      <Skeleton className="w-16 mt-2 h-4 rounded-lg" />
    </div>
  );
};

export default ProductListing;
