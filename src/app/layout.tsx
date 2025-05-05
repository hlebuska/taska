"use client";
import { Providers } from "@/redux/providers";
import Appbar from "../components/ui/appbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Appbar />
          {children}
        </body>
      </html>
    </Providers>
  );
}
