import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const prisma = new PrismaClient();

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No email returned from Google");
      }

      await prisma.user.upsert({
        where: { email: profile.email },
        create: { email: profile.email, name: profile.name },
        update: { email: profile.email, name: profile.name },
      });

      return true;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const prisma = new PrismaClient();

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No email returned from Google");
      }

      await prisma.user.upsert({
        where: { email: profile.email },
        create: { email: profile.email, name: profile.name },
        update: { email: profile.email, name: profile.name },
      });

      return true;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
