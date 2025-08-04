import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
  }
}

export const authOptions: NextAuthOptions = {
  // Only use Prisma adapter if prisma is available
  ...(prisma ? { adapter: PrismaAdapter(prisma) } : {}),
  providers: [
    // Google OAuth removed - no providers configured
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.uid) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
}; 