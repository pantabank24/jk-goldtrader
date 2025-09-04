import z from "zod";

export const FormSchema = z.object({
  name: z.string(),
  website: z.string(),
  address: z.string(),
  shopName: z.string(),
  taxId: z.string()
});

export type QuotForm = z.infer<typeof FormSchema>;