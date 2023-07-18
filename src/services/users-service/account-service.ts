import supabaseClient from "@/utils/supabaseBrowserClient";
import { deleteClient } from "../supabase-service";
import { ResponseType } from "@/types/api/api-schema";

export async function deleteUserAccount(): Promise<ResponseType> {
  const { data } = await supabaseClient.auth.getSession();
  const response = (await deleteClient(
    `/api/users/delete-account/${data.session?.user.id as string}`,
    data.session?.access_token as string
  )) as ResponseType;

  return response;
}
