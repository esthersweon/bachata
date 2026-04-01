import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import LogoutButton from "./ui/logoutButton";
import SideNav from "./ui/sidenav";

export const metadata: Metadata = {
  title: "Bachata School",
  description: "Learning and training platform for bachata dancers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-screen">
        <SideNav>
          <LogoutButton />
        </SideNav>
        <div className="w-full p-4 overflow-y-scroll">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
