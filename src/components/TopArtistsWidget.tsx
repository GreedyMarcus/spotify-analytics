import { useState } from "react";
import { Widget } from "./Widget";

export const TopArtistsWidget = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Spotify.TimeRange>("short_term");

  return (
    <Widget
      title="Top Artists"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeChange={(range) => setSelectedTimeRange(range)}
    >
      <div className="flex-center h-full text-slate-200">NO ITEMS</div>
    </Widget>
  );
};
