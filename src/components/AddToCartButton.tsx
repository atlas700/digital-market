"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({product}: {product: Product}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {addItem} = useCart()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        setIsSuccess(true);
        addItem(product)
      }}
      size="lg"
      className="w-full"
    >
      Add To Cart <ShoppingCart className="w-5 h-5 text-gray-200 ml-1.5"/>
    </Button>
  );
};

export default AddToCartButton;
