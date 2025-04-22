import { DefaultSession, DefaultUser } from "next-auth";

// Extend Prisma User model
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string; // Add custom fields like role
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string; // Add custom fields like role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string; // Add custom fields like role
  }
}
