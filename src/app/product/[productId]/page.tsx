import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductDetailsPageProps {
  params: {
    [key: string]: string | string[] | undefined;
  };
}

const BREADCRUMBS = [
  {
    id: "1",
    name: "Home",
    href: "/home",
  },
  {
    id: "2",
    name: "Products",
    href: "/products",
  },
];

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { productId } = params;

  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  const [product] = docs;

  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    (cat) => cat.value === product.category
  )?.label;

  const productImages = product?.images
    .map(({ image }) => {
      if (typeof image === "string") return image;
      else return image.url;
    })
    .filter(Boolean) as string[];

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((bc, idx) => (
                <li key={bc.id}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={bc.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {bc.name}
                    </Link>
                    {idx !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl text-gray-900 tracking-tight sm:text-4xl font-bold">
                {product.name}
              </h1>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>

                <p className="ml-4 border-l pl-4 border-gray-300 text-muted-foreground">
                  {label}
                </p>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check className="w-5 h-5 flex-shrink-0 text-green-500" />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant delivery
                </p>
              </div>
            </div>
          </div>
          {/* Image Slides */}
          <div className="mt-10 lg:mt-0 row-span-2 lg:col-start-2 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={productImages} />
            </div>
          </div>
          {/* Add To Cart */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div>
                <AddToCartButton product={product} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm font-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 text-blue-700 h-5 w-5 flex-shrink-0"
                  />

                  <span className="text-muted-foreground hover:text-gray-700">
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}' `}
      />
    </MaxWidthWrapper>
  );
};

export default ProductDetailsPage;
