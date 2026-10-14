import type { Metadata } from "next";
import { Marcellus, Manrope } from "next/font/google";
import "../app/_styles/globals.css";
import Navbar from "./_components/Navbar";
import Providers from "./providers";

const marcellus = Marcellus({
  variable: "--heading-font",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--body-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jailoo | Boutique Mountain Retreats in Kyrgyzstan",
  description:
    "Discover the beauty of Kyrgyzstan with Jailoo. Experience boutique yurt stays, breathtaking mountain landscapes, and authentic nomadic hospitality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${marcellus.variable} ${manrope.variable} flex min-h-screen flex-col`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
