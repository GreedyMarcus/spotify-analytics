import { ReactNode } from "react";

type Props = {
  startIcon?: ReactNode;
  children: ReactNode;
  onClick: VoidFunction;
};

export const MenuItem = ({ startIcon, children, onClick }: Props) => {
  return (
    <li
      className="flex w-full cursor-pointer items-center gap-3 rounded-md bg-slate-600 py-2 px-3 text-slate-200 transition-colors duration-300 ease-out hover:bg-slate-700"
      onClick={onClick}
    >
      {startIcon}
      {children}
    </li>
  );
};
