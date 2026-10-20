"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const links = [
  { href: "/yurts", label: "Yurts" },
  { href: "/about", label: "About" },
  { href: "/account", label: "Guest area" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const iconColor = pathname === "/" ? "text-white" : "text-plum";

  const linkColor = pathname === "/" ? "text-white" : "text-plum";

  return (
    <nav className="relative z-20 text-lg">
      {/* Desktop navigation */}
      <ul className="hidden items-center gap-8 lg:flex xl:gap-12">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${linkColor} transition-colors hover:opacity-70`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu button */}
      <button
        type="button"
        className={`flex items-center justify-center rounded-md p-2 transition-colors hover:bg-black/5 lg:hidden ${iconColor}`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <XMarkIcon className="h-7 w-7" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>

      {/* Mobile dropdown */}
      {isOpen && (
        <ul className="absolute right-0 top-full mt-3 flex min-w-48 flex-col gap-1 rounded-lg bg-white p-3 text-stone-800 shadow-xl lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-4 py-3 transition-colors hover:bg-stone-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
