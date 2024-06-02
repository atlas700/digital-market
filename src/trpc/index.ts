import { z } from "zod";
import { authRouter } from "./auth-router";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input, ctx }) => {
      const { cursor, query } = input;
      const { limit, sort, ...queryOptions } = query;

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOptions).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const payload = await getPayloadClient();

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
        },
        limit,
        page,
        sort,
        depth: 1,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
