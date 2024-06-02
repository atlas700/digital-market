import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const PERKS = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every assets on our platform is verified by our team to ensure our highest quality standards. Not happy? we offer a 30-day refund guarantee",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of natural environment.",
  },
];

const HomePage = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="flex text-center py-20 mx-auto flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high quality{" "}
            <span className="text-blue-600">digital assets</span>
          </h1>
          <p className="text-muted-foreground mt-6 text-lg max-w-prose">
            Welcome to digital marketplace. Every assets on our platform is
            verified by our team to ensure our highest quality standards.
          </p>

          <div className="flex flex-col mt-6 sm:flex-row gap-4">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise&rarr;</Button>
          </div>
        </div>

        <ProductReel title="Brand New" href="/products" query={{
          limit: 4,
          sort: "desc",
        }} />
        
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
           gap-y-12 sm:gap-x-6 lg:gap-x-8 lg:gap-y-0"
          >
            {PERKS.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:text-left lg:text-center md:flex md:items-start lg:block"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-muted-foreground text-sm">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default HomePage;
