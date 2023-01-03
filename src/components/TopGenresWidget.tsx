import { useState } from "react";
import { Widget } from "./Widget";

export const TopGenresWidget = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Spotify.TimeRange>("short_term");

  return (
    <Widget
      title="Top Genres"
      selectedTimeRange={selectedTimeRange}
      onTimeRangeChange={(range) => setSelectedTimeRange(range)}
    >
      <div className="flex-center h-full text-slate-200">NO ITEMS</div>
    </Widget>
  );
};
