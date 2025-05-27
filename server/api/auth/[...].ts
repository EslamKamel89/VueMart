import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "~/utils/db";
const config = useRuntimeConfig();
export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: config.authSecret,
  providers: [
    // @ts-ignore
    GithubProvider.default({
      clientId: config.githubId,
      clientSecret: config.githubSecret,
    }),
    // @ts-ignore
    GoogleProvider.default({
      clientId: config.googleId,
      clientSecret: config.googleSecret,
    }),
    // @ts-ignore
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        if (credentials?.email && credentials?.password) {
          throw createError({
            statusCode: 400,
            statusMessage: "Missing credentials",
          });
        } else {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
          if (!user) {
            throw createError({
              statusCode: 400,
              statusMessage: "User not found",
            });
          }
          if (!user.password) {
            throw createError({
              statusCode: 400,
              statusMessage: "User is signed with OAuth",
            });
          }

          const isPasswordValid = await bcrypt.compare(
            credentials?.password!,
            user?.password ?? "",
          );
          if (!isPasswordValid) {
            throw createError({
              statusCode: 400,
              statusMessage: "Invalid email or password",
            });
          }
          return user;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV !== "production",
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
});
