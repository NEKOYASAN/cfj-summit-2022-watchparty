import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '~/utils/prisma';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_JWT_SECRET } = process.env;

if (!GOOGLE_CLIENT_ID) throw new Error('You must provide GOOGLE_CLIENT_ID env var.');
if (!GOOGLE_CLIENT_SECRET) throw new Error('You must provide GOOGLE_CLIENT_SECRET env var.');
if (!NEXTAUTH_JWT_SECRET) throw new Error('You must provide NEXTAUTH_JWT_SECRET env var.');

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    secret: NEXTAUTH_JWT_SECRET,
    maxAge: 1 * 24 * 30 * 60, // 1 days
  },
};
