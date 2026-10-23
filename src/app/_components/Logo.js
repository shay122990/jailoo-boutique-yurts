"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoLight from "../../../public/jailoo-white.png";
import logoBrown from "../../../public/jailoo-brown.png";

function Logo() {
  const pathname = usePathname();
  const logo = pathname === "/" ? logoLight : logoBrown;

  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src={logo}
        alt="Jailoo logo"
        style={{ width: "80px", height: "auto" }}
        loading="eager"
      />
    </Link>
  );
}

export default Logo;
