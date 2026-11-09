"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: HomeIcon,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: CalendarDaysIcon,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: UserIcon,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="min-w-0 border-b border-pink pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
      <ul className="flex items-center gap-2 overflow-x-auto lg:h-full lg:flex-col lg:items-stretch">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <li key={link.name} className="shrink-0">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-3 text-sm font-semibold transition-colors sm:px-4 lg:text-base ${
                  active
                    ? "bg-pink text-plum"
                    : "text-plum/75 hover:bg-pink hover:text-plum"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0 text-purple" />
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}

        <li className="ml-auto shrink-0 lg:ml-0 lg:mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
