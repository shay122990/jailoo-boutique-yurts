import { Lora, Manrope } from "next/font/google";
import "../app/_styles/globals.css";
import Navbar from "./_components/Navbar";

const lora = Lora({
  variable: "--heading-font",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--body-font",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jailoo | Boutique Mountain Retreats in Kyrgyzstan",
  description:
    "Discover the beauty of Kyrgyzstan with Jailoo. Experience boutique yurt stays, breathtaking mountain landscapes, and authentic nomadic hospitality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${manrope.variable} flex min-h-screen flex-col`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
