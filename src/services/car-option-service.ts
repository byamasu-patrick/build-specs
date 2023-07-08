import {
  CarOptionsSchemaType,
  CreateCarOptionsSchemaType,
  FormikCarOptionsSchemaType,
} from "@/types/zod-schema/cars-option-schema";
import supabaseClient from "@/utils/supabaseBrowserClient";
import {
  deleteClient,
  getClient,
  postClient,
  updateClient,
} from "./supabase-service";
import { ResponseType } from "@/types/api/api-schema";

export async function createCarInformation(values: FormikCarOptionsSchemaType) {
  const carOptions: CarOptionsSchemaType = {
    body: values.body,
    build_date: values.buildDate,
    doors: values.doors,
    engine_size: values.engineSize,
    fuel: values.fuel,
    make: values.make,
    model: values.model,
    model_year: values.modelYear,
    trim: values.trim,
    version: values.version,
  };

  const { data } = await supabaseClient.auth.getSession();
  const response = await postClient(
    "/api/cars/create-cars-info",
    carOptions,
    data.session?.access_token as string
  );

  return response;
}
export async function getCarsFromSupabase(): Promise<
  CreateCarOptionsSchemaType[] | []
> {
  const { data } = await supabaseClient.auth.getSession();
  const response = (await getClient(
    "/api/cars/get-cars-by-user",
    data.session?.access_token as string
  )) as ResponseType;

  return response.data as CreateCarOptionsSchemaType[];
}

export async function deleteCarFromSupabase(id: number): Promise<ResponseType> {
  const { data } = await supabaseClient.auth.getSession();
  const response = (await deleteClient(
    `/api/cars/${id}`,
    data.session?.access_token as string
  )) as ResponseType;

  return response;
}

export async function updateCarFromDatabase({
  id,
  values,
}: {
  id: number;
  values: FormikCarOptionsSchemaType;
}): Promise<ResponseType> {
  const carOptions: CarOptionsSchemaType = {
    body: values.body,
    build_date: values.buildDate,
    doors: values.doors,
    engine_size: values.engineSize,
    fuel: values.fuel,
    make: values.make,
    model: values.model,
    model_year: values.modelYear,
    trim: values.trim,
    version: values.version,
  };
  const { data } = await supabaseClient.auth.getSession();

  const response = (await updateClient(
    `/api/cars/car-update/${id}`,
    carOptions,
    data.session?.access_token as string
  )) as ResponseType;

  return response;
}
