import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  type Session,
  SessionContextProvider,
} from "@supabase/auth-helpers-react";
import supabaseClient from "@/utils/supabaseBrowserClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider
      initialSession={pageProps.initialSession}
      supabaseClient={supabaseClient}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
