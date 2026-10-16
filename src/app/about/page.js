import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function About() {
  return (
    <div>
      <h1>about us</h1>
      <Link href="/about/experiences">Explore Experiences</Link>
    </div>
  );
}
