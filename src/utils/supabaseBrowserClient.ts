import { type Database } from "@/types/supabase";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
// import { createClient } from "@supabase/supabase-js";

// const supabaseClient = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
// );

const supabaseClient = createPagesBrowserClient<Database>();
// utils/supabase.js

// export { supabaseClient };
export default supabaseClient;
