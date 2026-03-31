import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "./app/types";
import { authConfig } from "./auth.config";

const sql = neon(process.env.POSTGRES_URL!);

async function getUser(email: string): Promise<User | null> {
  try {
    const user = (await sql`
      SELECT
        id,
        email,
        password,
        first_name AS "firstName",
        last_name AS "lastName"
      FROM users
      WHERE email=${email}`) as User[];
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
