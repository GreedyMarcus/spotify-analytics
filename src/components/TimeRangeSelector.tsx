import { useState } from "react";
import { clsx } from "clsx";
import ChevronDownIcon from "@svgs/chevron-down-icon.svg";
import ChevronUpIcon from "@svgs/chevron-up-icon.svg";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

type Props = {
  selected: Spotify.TimeRange;
  onChange: (range: Spotify.TimeRange) => void;
};

export const TimeRangeSelector = ({ selected, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const ranges: Record<Spotify.TimeRange, string> = {
    short_term: "Last 4 weeks",
    medium_term: "Last 6 months",
    long_term: "All time",
  };

  return (
    <Menu
      anchorElement={
        <button
          tabIndex={-1}
          className={clsx(
            "flex w-40 justify-between rounded-md py-2 pl-4 pr-2 text-slate-200",
            isOpen && "ring-2 ring-spotify"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{ranges[selected]}</span>
          {isOpen ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
        </button>
      }
      isOpen={isOpen}
      width="w-40"
      placement="bottom-end"
      offset={{ y: 12 }}
      onClose={() => setIsOpen(false)}
    >
      <MenuItem onClick={() => onChange("short_term")}>{ranges.short_term}</MenuItem>
      <MenuItem onClick={() => onChange("medium_term")}>{ranges.medium_term}</MenuItem>
      <MenuItem onClick={() => onChange("long_term")}>{ranges.long_term}</MenuItem>
    </Menu>
  );
};
