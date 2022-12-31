import "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
  }
}

declare module "next-auth" {
  interface SessionUser {
    name: string;
    email: string;
    image?: string;
  }

  interface Session {
    user: SessionUser;
    expires: string;
    accessToken: string;
  }
}
