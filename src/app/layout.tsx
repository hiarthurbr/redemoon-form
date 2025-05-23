import "::styles/globals.css";
import type { Metadata, Viewport } from "next";

import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans } from "::lib/fonts";
import { Navbar } from "::components/navbar";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="pt-16 px-6 grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
