import Image from "next/image";

type Props = {
  name: string;
  image?: string;
};

export const Avatar = ({ name, image }: Props) => {
  return (
    <div className="flex-center relative h-9 w-9 select-none rounded-full">
      {image ? (
        <Image className="rounded-full" src={image} alt={name} sizes="2.25rem" fill />
      ) : (
        <span className="text-2xl text-slate-900">{name.charAt(0)}</span>
      )}
    </div>
  );
};
