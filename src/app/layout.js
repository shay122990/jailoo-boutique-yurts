import { Montserrat } from "next/font/google";
import "./_styles/globals.css";
import Header from "./_components/Header";

const mont = Montserrat({
  variable: "--heading-font",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: {
    template: "%s - Jailoo",
    default: "Jailoo | Boutique Mountain Retreats in Kyrgyzstan",
  },
  description:
    "Discover the beauty of Kyrgyzstan with Jailoo. Experience boutique yurt stays, breathtaking mountain landscapes, and authentic nomadic hospitality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${mont.variable} flex min-h-screen flex-col bg-plum text-pink antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
