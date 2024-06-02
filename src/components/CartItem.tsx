"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];
  const label = PRODUCT_CATEGORIES.find(
    (prod) => prod.value === product.category
  )?.label;

  const { removeItem } = useCart();

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative min-w-fit w-16 h-16 overflow-hidden aspect-square">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt="product image"
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>
            <span className="line-clamp-1 text-muted-foreground text-xs capitalize">
              {label}
            </span>
            <div className="mt-4 text-muted-foreground text-xs">
              <button
                onClick={() => removeItem(product.id)}
                className="flex gap-0 5 items-center"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-y-1 flex-col font-medium">
          <span className="ml-auto text-sm line-clamp-1">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
