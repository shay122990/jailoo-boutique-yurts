import Link from "next/link";

function Navbar() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/yurts">Yurts</Link>
        <Link href="/account">Your Account</Link>
      </li>
    </ul>
  );
}

export default Navbar;
