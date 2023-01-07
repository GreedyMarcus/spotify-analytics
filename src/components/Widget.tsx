import { ReactNode } from "react";
import ErrorIcon from "@svgs/error-icon.svg";
import { Spinner } from "./Spinner";
import { TimeRangeSelector } from "./TimeRangeSelector";

type Props = {
  title: string;
  loading: boolean;
  error?: string;
  selectedTimeRange: Spotify.TimeRange;
  children: ReactNode;
  onTimeRangeChange: (range: Spotify.TimeRange) => void;
};

export const Widget = ({ title, loading, error, selectedTimeRange, children, onTimeRangeChange }: Props) => {
  return (
    <section className="flex h-[calc(100vh_-_6rem)] flex-col rounded-md bg-slate-900 py-3 px-4">
      <header className="flex items-center justify-between">
        <h2 className="select-none text-xl text-slate-200">{title}</h2>
        <TimeRangeSelector selected={selectedTimeRange} onChange={onTimeRangeChange} />
      </header>
      {loading ? (
        <div className="flex-center h-full animate-fade-in">
          <Spinner />
        </div>
      ) : (
        <>
          {error ? (
            <div className="flex-center h-full animate-fade-in flex-col gap-3 text-slate-200">
              <ErrorIcon className="h-16 w-16" />
              <span>{error}</span>
            </div>
          ) : (
            <div className="hidden-scrollbar overflow-faded flex h-full animate-fade-in flex-col overflow-auto py-4">
              {children}
            </div>
          )}
        </>
      )}
    </section>
  );
};
