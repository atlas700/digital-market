"use client";

import { PRODUCT_CATEGORIES } from "@/config/index";
import { useClickAway } from "@uidotdev/usehooks";
import { useState } from "react";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isAnyOpen = activeIndex !== null;

  const ref = useClickAway<HTMLDivElement>(() => {
    setActiveIndex(null);
  });

  return (
    <div className="flex gap-4 h-full" ref={ref}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) setActiveIndex(null);
          else setActiveIndex(i);
        };

        const isOpen = i === activeIndex;

        return (
          <NavItem
            key={category.value}
            category={category}
            isOpen={isOpen}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
