import axios from "axios";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

/**
 * Available authorization scopes:
 * https://developer.spotify.com/documentation/general/guides/authorization/scopes/
 */
const SCOPES = [
  "user-read-private",
  "user-library-modify",
  "user-library-read",
  "playlist-modify-private",
  "user-read-email",
  "playlist-read-private",
  "user-top-read",
];

/**
 * Takes a token, and returns a new token with updated `accessToken` and `accessTokenExpires`.
 * If an error occurs, returns the old token and an error property.
 */
const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const response = await axios.post<Spotify.RefreshedAccessTokenResponse>(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      accessTokenExpiresAt: Date.now() + response.data.expires_in * 1000,
      refreshToken: token.refreshToken,
      user: token.user,
    };
  } catch {
    return { ...token, error: true };
  }
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: SCOPES.join(" "),
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        token.accessToken = account.access_token ?? "";
        token.accessTokenExpiresAt = account.expires_at ?? 0;
        token.refreshToken = account.refresh_token ?? "";
        token.user = user;
      }

      if (token.accessTokenExpiresAt > Date.now()) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.error = token.error;
      return session;
    },
  },
});
