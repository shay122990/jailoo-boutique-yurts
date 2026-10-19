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
        className={` bg-plum text-pink ${mont.variable} antialiased flex min-h-screen flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid w-full">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
