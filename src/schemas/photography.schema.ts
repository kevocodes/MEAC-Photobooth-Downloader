import { z } from "zod";

export const photographySchema = z.object({
  code: z
    .string()
    .min(1, "El código es requerido")
    .max(3, "El código debe tener 3 caracteres"),
});
