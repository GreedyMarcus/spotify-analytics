import { clsx } from "clsx";
import SpotifyLogo from "@svgs/spotify-logo.svg";
import { Page } from "@components/Page";

export default function Login() {
  return (
    <Page title="Login">
      <main className="flex-center h-full bg-gradient-to-b from-slate-700 to-slate-800">
        <div className="flex-center h-full animate-login-fade-in flex-col gap-8">
          <div className="flex-center flex-col gap-6 sm:flex-row">
            <SpotifyLogo className="w-64 text-spotify sm:w-80" />
            <span className="select-none border-t-2 border-slate-200 pt-4 text-5xl uppercase text-slate-200 sm:border-t-0 sm:border-l-4 sm:pl-6 sm:pt-2">
              Analytics
            </span>
          </div>
          <button className="animate-login-pulse select-none rounded-2xl bg-spotify py-2.5 px-7 text-xl font-semibold">
            Sign in to Spotify
          </button>
        </div>
      </main>
    </Page>
  );
}