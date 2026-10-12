"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/jailoo-logo.jpg";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const navLinks = [
  { href: "/cabins", label: "Our Yurts" },
  { href: "/experiences", label: "Experiences" },
  { href: "/guest", label: "Guest area" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" z-50 w-full shrink-0 border-b border-white/20 font-heading">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link
          href="/"
          aria-label="Jailoo homepage"
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src={logo}
            alt="Jailoo"
            width={100}
            height={70}
            priority
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/90 transition-colors hover:text-amber-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-12 w-12 items-center justify-center text-4xl text-white transition-colors hover:text-amber-200 md:hidden"
        >
          {isOpen ? <IoCloseOutline /> : <CiMenuFries />}
        </button>
      </div>
      {/* Mobile navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-stone-950/95 px-6 py-5 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/10 py-4 text-sm text-white/90 transition-colors last:border-b-0 hover:text-amber-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
