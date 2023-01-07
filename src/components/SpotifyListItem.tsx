import Image from "next/image";

type Props = {
  spotifyUrl: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  subtitle: string;
};

export const SpotifyListItem = ({ spotifyUrl, imageUrl, imageAlt, title, subtitle }: Props) => {
  return (
    <a href={spotifyUrl} target="_blank" rel="noreferrer">
      <div className="flex select-none items-center gap-3 rounded-md p-2 text-slate-400 hover:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex-center relative h-20 w-20 rounded-md">
            <Image className="rounded-md" src={imageUrl} alt={imageAlt} sizes="5rem" fill />
          </div>
          <div className="flex w-52 flex-col gap-0.5 sm:w-96 md:w-72">
            <span className="truncate text-lg font-semibold" title={title}>
              {title}
            </span>
            <span className="truncate text-slate-500" title={subtitle}>
              {subtitle}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};
