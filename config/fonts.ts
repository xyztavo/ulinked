import { Didact_Gothic, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontGothic = Didact_Gothic({
  subsets: ["latin"],
  variable: "--font-gothic",
  weight: "400",
})