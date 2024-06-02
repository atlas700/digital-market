"use client";

import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductListing from "./ProductListing";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 1;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;

  const { data, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit || FALLBACK_LIMIT,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const items = data?.pages.flatMap(({ items }) => items);

  let products: (Product | null)[] = [];

  if (items && items.length) products = items;
  else products = new Array<null>(query.limit || FALLBACK_LIMIT).fill(null);

  return (
    <section className="py-20">
      <div className=" md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            className="hidden md:block text-sm font-medium text-blue-600 hover:text-blue-500"
            href={href}
          >
            Shop the collection
            <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid gird-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-2 md:gap-y-10 lg:gap-x-8">
            {products.map((product, idx) => (
              <ProductListing key={idx} product={product} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
