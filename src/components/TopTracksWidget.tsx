import { useState } from "react";
import { useSpotifyAPI } from "@hooks/useSpotifyAPI";
import { SpotifyListItem } from "./SpotifyListItem";
import { Widget } from "./Widget";

export const TopTracksWidget = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Spotify.TimeRange>("short_term");

  const { loading, data, error } = useSpotifyAPI<SpotifyApi.UsersTopTracksResponse>(
    `/me/top/tracks?limit=10&time_range=${selectedTimeRange}`
  );

  return (
    <Widget
      title="Top Tracks"
      loading={loading}
      error={error}
      selectedTimeRange={selectedTimeRange}
      onTimeRangeChange={(range) => setSelectedTimeRange(range)}
    >
      {data?.items.map((item) => (
        <SpotifyListItem
          key={item.id}
          spotifyUrl={item.external_urls.spotify}
          imageUrl={item.album.images[0].url}
          imageAlt={item.album.name}
          title={item.name}
          subtitle={item.artists.map((artist) => artist.name).join(", ")}
        />
      ))}
    </Widget>
  );
};
