import { User } from "@supabase/supabase-js";
import { CreateCarOptionsSchemaType } from "../zod-schema/cars-option-schema";

export type ResponseType = {
  code: 200 | 401 | 403 | 500;
  message: string;
  data: User | CreateCarOptionsSchemaType | CreateCarOptionsSchemaType[] | null;
};
export type ResponsesType = {
  code: 200 | 401 | 403 | 500;
  message: string;
  data: User | null;
};
