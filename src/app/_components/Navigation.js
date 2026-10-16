import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/yurts" className="hover:text transition-colors">
            Yurts
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="/account" className="hover:text transition-colors">
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
