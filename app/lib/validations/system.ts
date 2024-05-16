import * as z from "zod";

import { csrfTokenSchema } from "./auth";

export const updateSchema = csrfTokenSchema.extend({
  version: z.number().optional(),
});
