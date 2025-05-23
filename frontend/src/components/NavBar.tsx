"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="w-full bg-white border-b shadow-sm mb-8">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center space-x-6">
          <span className="font-bold text-lg text-blue-600">LinguaForge</span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded hover:bg-blue-100 transition-colors ${pathname === link.href ? "text-blue-700 font-semibold" : "text-gray-700"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
