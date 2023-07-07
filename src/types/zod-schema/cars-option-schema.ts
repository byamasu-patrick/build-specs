import z from "zod";

const carOptionsSchema = z.object({
  make: z.string(),
  model: z.string(),
  version: z.string(),
  model_year: z.number().int(),
  fuel: z.string(),
  trim: z.string(),
  engine_size: z.number(),
  doors: z.number().int(),
  body: z.string(),
  build_date: z.string(),
});

const FormikCarOptionsSchema = z.object({
  make: z.string(),
  model: z.string(),
  version: z.string(),
  modelYear: z.number().int(),
  fuel: z.string(),
  trim: z.string(),
  engineSize: z.number(),
  doors: z.number().int(),
  body: z.string(),
  buildDate: z.string(),
});

const CreateCarOptionsSchema = carOptionsSchema.extend({
  id: z.number().positive(),
  created_at: z.string(),
});

export type CarOptionsSchemaType = z.infer<typeof carOptionsSchema>;
export type FormikCarOptionsSchemaType = z.infer<typeof FormikCarOptionsSchema>;
export type CreateCarOptionsSchemaType = z.infer<typeof CreateCarOptionsSchema>;
