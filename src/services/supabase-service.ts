import {
  CarOptionsSchemaType,
  FormikCarOptionsSchemaType,
} from "@/types/zod-schema/cars-option-schema";

import axios from "axios";

function getHeaders(access_token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
}

export async function postClient(
  url: string,
  values: CarOptionsSchemaType,
  access_token: string
) {
  const response = await axios.post(url, values, getHeaders(access_token));
  return response.data;
}

export async function getClient(url: string, access_token: string) {
  const response = await axios.get(url, getHeaders(access_token));
  return response.data;
}
