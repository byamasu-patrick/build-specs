// Import necessary dependencies and types
import { ResponseType } from "@/types/api/api-schema";
import { Database } from "@/types/supabase";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
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
  const supabaseAdmin = () => {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE as string
    );
  };

  const supabaseServerClient = createPagesServerClient<Database>({
    req,
    res,
  });

  // Get the session data from Supabase client
  const { data, error } = await supabaseServerClient.auth.getSession();

  console.log("Session: ", data.session);

  // Handle authentication errors
  if (error) {
    res.status(403).json({
      code: 403,
      data: null,
      message: "Not authenticated",
    });
  }

  try {
    // Check if a session exists, if there is a session, then proceed. If not return a 401
    if (data.session) {
      // delete car by id and user id
      const query = req.query;
      const { userId } = query;

      const { data: deleteData, error: deleteError } =
        await supabaseAdmin().auth.admin.deleteUser(userId as string, true);

      // return fetched car options
      if (deleteData && !deleteError) {
        res.status(200).json({
          code: 204,
          data: null,
          message: "Your account has successfully been deleted!",
        });
      }

      console.log(deleteError?.message);

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
      message:
        "Not allowed to perform this action because you are not authenticated",
    });
  } catch (error) {
    res.status(500);
  }
}
