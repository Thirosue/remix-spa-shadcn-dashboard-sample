import * as z from "zod";

import { updateSchema } from "./system";

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Product description must be at least 3 characters" }),
  quantity: z.coerce.number(),
});

export const productUpsertSchema = productSchema.merge(updateSchema);
