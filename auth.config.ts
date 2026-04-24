import type { NextAuthConfig } from "next-auth";
import { bottomNavigation, topNavigation } from "./app/ui/navigation";

const pathsRequiringAuth = [...topNavigation, ...bottomNavigation].map(
  ({ href }) => href,
);

export const authConfig = {
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPageRequiringAuth = pathsRequiringAuth.some((path) =>
        nextUrl.pathname.startsWith(path),
      );
      if (isOnPageRequiringAuth) {
        // Redirect unauthenticated users to login page
        return isLoggedIn;
      } else if (isLoggedIn) {
        // Redirect authenticated users to home page
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        const id =
          (typeof token.id === "string" && token.id) ||
          (typeof token.sub === "string" && token.sub);
        if (id) {
          session.user.id = id;
        }
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
