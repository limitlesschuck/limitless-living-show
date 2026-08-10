import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import showConfig from "@/show.config";
import { getBrandColorCssVars } from "@/lib/brand-server";

export const metadata: Metadata = {
  title: showConfig.showName,
  description: showConfig.showTagline,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brandColorVars = await getBrandColorCssVars();

  return (
    <html lang="en" style={brandColorVars as React.CSSProperties}>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
