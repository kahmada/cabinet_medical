import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { createSession, setSessionCookie } from "./session";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          // Check if user exists
          let existingUser = await prisma.patient.findUnique({
            where: { email: user.email },
          });

          // Create user if doesn't exist
          if (!existingUser) {
            const names = user.name?.split(" ") || ["", ""];
            existingUser = await prisma.patient.create({
              data: {
                email: user.email,
                firstName: names[0] || "User",
                lastName: names.slice(1).join(" ") || "",
                password: "", // No password for OAuth users
                role: "patient",
                isActive: true,
              },
            });
          }

          // Create session
          const token = await createSession(existingUser.id);
          await setSessionCookie(token);

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
});

