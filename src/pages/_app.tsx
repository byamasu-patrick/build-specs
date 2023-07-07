import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabaseClient from "@/utils/supabaseBrowserClient";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <SessionContextProvider
      initialSession={pageProps.initialSession}
      supabaseClient={supabaseClient}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
