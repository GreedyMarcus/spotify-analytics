import NextAuth from "next-auth";
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

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { scope: SCOPES.join(" ") },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
