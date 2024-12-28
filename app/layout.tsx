import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontGothic } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx("min-h-screen bg-background antialiased font-mono")}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/assets/static.gif')] bg-repeat bg-[length:300px_300px] opacity-5 pointer-events-none z-0" />

            {/* Main Content */}
            <main
              className={
                "relative z-10 container mx-auto max-w-7xl pt-16 px-6 flex-grow " +
                fontGothic.className
              }
            >
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
