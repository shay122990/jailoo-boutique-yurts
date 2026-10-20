import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/jailoo-brown.png";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src={logo}
        alt="Jailoo logo"
        style={{ width: "80px", height: "auto" }}
      />
    </Link>
  );
}

export default Logo;
