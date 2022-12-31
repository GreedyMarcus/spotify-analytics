import { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "@styles/globals.css";

type Props = {
  session: Session;
};

export default function App({ Component, pageProps }: AppProps<Props>) {
  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={false} refetchWhenOffline={false}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
