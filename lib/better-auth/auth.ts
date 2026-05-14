import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "../prisma";

// Singleton instance: only creates once instance for auth 
let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;



  authInstance = betterAuth({
    database: prismaAdapter(prisma, {
      provider: "mongodb"
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()]
  })
  return authInstance;
};

export const auth = await getAuth();