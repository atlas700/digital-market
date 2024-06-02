import { User } from "@/payload-types";
import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req }) => {
  const { user }: { user: User | null } = req;

  if (user?.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

export const Order: CollectionConfig = {
  slug: "order",
  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of all your orders in Digital Marketplace",
  },
  access: {
    read: yourOwn,
    create: ({ req }) => req.user.role === "admin",
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      required: true,
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
    },
  ],
};
