import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaBookOpen, FaTrophy, FaChartBar, FaShoppingCart, FaBolt, FaEllipsisH } from "react-icons/fa";

const navItems = [
  { label: "Learn", icon: <FaBookOpen />, href: "/learn" },
  { label: "Practice", icon: <FaBolt />, href: "/practice" },
  { label: "Leaderboards", icon: <FaChartBar />, href: "/leaderboards" },
  { label: "Quests", icon: <FaTrophy />, href: "/quests" },
  { label: "Shop", icon: <FaShoppingCart />, href: "/shop" },
  { label: "Profile", icon: <FaUser />, href: "/profile" },
  { label: "More", icon: <FaEllipsisH />, href: "/more" },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  return (
    <aside className="bg-[#101820] text-white w-56 min-h-screen flex flex-col py-8 px-2">
      <div className="mb-8">
        <span className="text-3xl font-extrabold tracking-tight text-green-400">linguaforge</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-lg font-medium hover:bg-green-900/30 ${pathname === item.href ? "bg-green-900/60 text-green-300" : "text-white"}`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
