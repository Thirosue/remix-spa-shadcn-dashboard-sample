import * as z from "zod";

import { updateSchema } from "./system";

const codeSchema = z.object({
  categoryCode: z.string().min(1, { message: "Category code is required" }),
  codeValue: z.string().min(1, { message: "Code value is required" }),
  codeName: z.string().min(1, { message: "Code name is required" }),
  codeAlias: z.string().nullable().optional(),
  displayOrder: z.coerce
    .number()
    .min(0, { message: "Display order must be a positive number" }),
});

export const codeUpsertSchema = codeSchema.merge(updateSchema);

const codeCategorySchema = z.object({
  categoryCode: z.string().min(1, { message: "Category code is required" }),
  categoryName: z.string().min(1, { message: "Category name is required" }),
  description: z.string().nullable().optional(),
});

export const codeCategoryUpsertSchema = codeCategorySchema.merge(updateSchema);
