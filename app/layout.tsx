import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import { AuthSessionProvider } from "./providers";
import LogoutButton from "./ui/logoutButton";
import SideNav from "./ui/sidenav";

export const metadata: Metadata = {
  title: "Bachata School",
  description: "Learning and training platform for bachata dancers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-screen">
        <AuthSessionProvider session={session}>
          <SideNav>
            <LogoutButton />
          </SideNav>
          <div className="w-full p-4 overflow-y-scroll">{children}</div>
        </AuthSessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
