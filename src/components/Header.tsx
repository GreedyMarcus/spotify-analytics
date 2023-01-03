import SpotifyLogo from "@svgs/spotify-logo.svg";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  return (
    <header className="fixed top-0 z-header flex h-16 w-full items-center justify-between bg-slate-900 px-4 shadow-md">
      <div className="flex items-center gap-4">
        <SpotifyLogo className="w-32 text-slate-200" />
        <span className="select-none border-l-2 border-slate-200 pl-4 pt-1 text-2xl uppercase text-slate-200">
          Analytics
        </span>
      </div>
      <UserMenu />
    </header>
  );
};
