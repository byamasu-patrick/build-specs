// Import necessary dependencies and types
import { ResponseType } from "@/types/api/api-schema";
import { Database } from "@/types/supabase";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method !== "DELETE")
    res
      .status(403)
      .json({ code: 403, data: null, message: "Method not allowed" });
  // Create a server-side Supabase client using auth helpers
  const supabaseServerClient = createPagesServerClient<Database>({
    req,
    res,
  });

  // Get the session data from Supabase client
  const { data, error } = await supabaseServerClient.auth.getSession();

  // Handle authentication errors
  if (error) {
    res.status(403).json({
      code: 403,
      data: null,
      message: "Not allowed to perform this action",
    });
  }

  try {
    // Check if a session exists, if there is a session, then proceed. If not return a 401
    if (data.session) {
      // delete car by id and user id
      const query = req.query;
      const { carId } = query;

      const {
        status,
        count,
        data: deletedData,
        statusText,
      } = await supabaseServerClient
        .from("cars_options")
        .delete()
        .eq("user_id", data.session.user.id)
        .eq("id", carId);

      console.log(deletedData, count, status, statusText);

      // return fetched car options
      if (status === 204) {
        res.status(200).json({
          code: 204,
          data: null,
          message: statusText,
        });
      }

      // Handle fetch failure, and return 401 code
      res.status(401).json({
        code: 401,
        data: null,
        message: "Failed to delete data",
      });
    }

    // Handle missing session
    res.status(401).json({
      code: 401,
      data: null,
      message: "Not allowed to perform this action",
    });
  } catch (error) {
    res.status(500);
  }
}
