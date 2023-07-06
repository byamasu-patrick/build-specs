import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/types/supabase";

const supabaseClient = createPagesBrowserClient<Database>();

export default supabaseClient;
