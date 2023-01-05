declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ENV: string;
      SPOTIFY_CLIENT_ID: string;
      SPOTIFY_CLIENT_SECRET: string;
    }
  }

  namespace Spotify {
    type TimeRange = "short_term" | "medium_term" | "long_term";

    interface RefreshedAccessTokenResponse {
      access_token: string;
      token_type: string;
      expires_in: number;
      scope: string;
    }
  }

  interface Position {
    x: number;
    y: number;
  }
}

export {};
