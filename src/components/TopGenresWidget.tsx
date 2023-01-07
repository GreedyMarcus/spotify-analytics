import { useMemo, useState } from "react";
import { useSpotifyAPI } from "@hooks/useSpotifyAPI";
import { ProgressBar } from "./ProgressBar";
import { Widget } from "./Widget";

export const TopGenresWidget = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Spotify.TimeRange>("short_term");

  const { loading, data, error } = useSpotifyAPI<SpotifyApi.UsersTopArtistsResponse>(
    `/me/top/artists?limit=10&time_range=${selectedTimeRange}`
  );

  const [genres, genresTotalCount] = useMemo(() => {
    if (!data?.items) return [[], 0];

    const { genres, genresTotalCount } = data.items.reduce(
      (acc, item) => {
        item.genres.forEach((genre) => {
          acc.genresTotalCount++;
          acc.genres[genre] = (acc.genres[genre] ?? 0) + 1;
        });
        return acc;
      },
      { genresTotalCount: 0, genres: {} as Dictionary<number> }
    );

    return [Object.entries(genres).sort(([, a], [, b]) => b - a), genresTotalCount];
  }, [data]);

  return (
    <Widget
      title="Top Genres"
      loading={loading}
      error={error}
      selectedTimeRange={selectedTimeRange}
      onTimeRangeChange={(range) => setSelectedTimeRange(range)}
    >
      {genres.map(([key, value]) => (
        <ProgressBar key={key} label={key} value={value} max={genresTotalCount} />
      ))}
    </Widget>
  );
};
