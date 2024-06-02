import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";
import { Users } from "./collections/Users";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFile";
import { Order } from "./collections/Order";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const mockModulePath = path.resolve(__dirname, "./emptyModule.js");

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Order],
  routes: {
    admin: "/sell",
  },
  admin: {
    bundler: webpackBundler(),
    user: Users.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config?.resolve,
        alias: [
          "fs",
          "handlebars",
          "inline-css",
          path.resolve(__dirname, "./email/transport"),
          path.resolve(__dirname, "./email/generateEmailHTML"),
          path.resolve(__dirname, "./email/generateForgotPasswordEmail"),
          path.resolve(__dirname, "./email/generateVerificationEmail"),
        ].reduce(
          (aliases, importPath) => ({
            ...aliases,
            [importPath]: mockModulePath,
          }),
          config.resolve?.alias
        ),
      },
    }),
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
