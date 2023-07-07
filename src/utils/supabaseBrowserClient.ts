import { type Database } from "@/types/supabase";

import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
export { supabaseClient };

// const supabaseClient = createPagesBrowserClient<Database>();
// import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
// utils/supabase.js

export default supabaseClient;
