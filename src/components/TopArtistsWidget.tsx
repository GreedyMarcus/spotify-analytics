import { useState } from "react";
import { useSpotifyAPI } from "@hooks/useSpotifyAPI";
import { SpotifyListItem } from "./SpotifyListItem";
import { Widget } from "./Widget";

export const TopArtistsWidget = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Spotify.TimeRange>("short_term");

  const { loading, data, error } = useSpotifyAPI<SpotifyApi.UsersTopArtistsResponse>(
    `/me/top/artists?limit=10&time_range=${selectedTimeRange}`
  );

  return (
    <Widget
      title="Top Artists"
      loading={loading}
      error={error}
      selectedTimeRange={selectedTimeRange}
      onTimeRangeChange={(range) => setSelectedTimeRange(range)}
    >
      {data?.items.map((item) => (
        <SpotifyListItem
          key={item.id}
          spotifyUrl={item.external_urls.spotify}
          imageUrl={item.images[0].url}
          imageAlt={item.name}
          title={item.name}
          subtitle={`${new Intl.NumberFormat("en-EN").format(item.followers.total)} monthly followers`}
        />
      ))}
    </Widget>
  );
};
