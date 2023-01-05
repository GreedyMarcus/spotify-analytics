import "next-auth";

declare module "next-auth/jwt" {
  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
  }

  interface JWT {
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken: string;
    user: User;
    error?: boolean;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
  }

  interface Session {
    user: User;
    expires: string;
    accessToken: string;
    error?: boolean;
  }
}
