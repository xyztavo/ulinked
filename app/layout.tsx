import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

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
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative bg-background antialiased font-mono flex flex-col min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/assets/static.gif')] bg-repeat opacity-5 pointer-events-none z-0" />
            {/* Main Content */}
            <main
              className={
                "flex items-center justify-center z-10  m-auto pt-16 md:pt-0 flex-grow " +
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
