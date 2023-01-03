import { ReactNode } from "react";
import { TimeRangeSelector } from "./TimeRangeSelector";

type Props = {
  title: string;
  selectedTimeRange: Spotify.TimeRange;
  children: ReactNode;
  onTimeRangeChange: (range: Spotify.TimeRange) => void;
};

export const Widget = ({ title, selectedTimeRange, children, onTimeRangeChange }: Props) => {
  return (
    <section className="flex h-[calc(100vh_-_6rem)] flex-col gap-3 rounded-md bg-slate-900 py-3 px-4 md:h-full">
      <header className="flex items-center justify-between">
        <h2 className="select-none text-xl text-slate-200">{title}</h2>
        <TimeRangeSelector selected={selectedTimeRange} onChange={onTimeRangeChange} />
      </header>
      {children}
    </section>
  );
};
