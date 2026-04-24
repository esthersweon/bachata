"use server";

import { signIn } from "@/auth";
import { neon } from "@neondatabase/serverless";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function updateRSVP({
  eventId,
  rsvp,
  userId,
}: {
  eventId: string;
  rsvp: boolean | null;
  userId: string;
}): Promise<{ status: 200 | 500; ok: boolean }> {
  const url = process.env.POSTGRES_URL;
  if (!url) return { status: 500, ok: false };

  try {
    const sql = neon(url);
    await sql`INSERT INTO users_events (id, user_id, event_id, rsvp)
      VALUES (${crypto.randomUUID()}, ${userId}, ${eventId}, ${rsvp})
      ON CONFLICT (user_id, event_id)
      DO UPDATE SET rsvp = EXCLUDED.rsvp`;

    return { status: 200, ok: true };
  } catch {
    return { status: 500, ok: false };
  }
}
