import type { Metadata } from "next";
import "./globals.css";
import SideNav from "./ui/sidenav";

export const metadata: Metadata = {
  title: "Bachata LA",
  description: "Bachata learning platform for Angelenos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-screen">
        <SideNav />
        <div className="w-full p-4 overflow-y-scroll">{children}</div>
      </body>
    </html>
  );
}
