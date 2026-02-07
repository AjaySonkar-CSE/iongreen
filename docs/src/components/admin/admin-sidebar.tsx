
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Newspaper, 
  Beaker, 
  Lightbulb, 
  FileText, 
  MonitorPlay, 
  MessageSquare, 
  Users,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "News",
    href: "/admin/news",
    icon: Newspaper,
  },
  {
    title: "Lab Equipment",
    href: "/admin/lab-equipment",
    icon: Beaker,
  },
  {
    title: "Solutions",
    href: "/admin/solutions",
    icon: Lightbulb,
  },
  {
    title: "Case Studies",
    href: "/admin/case-studies",
    icon: FileText,
  },
  {
    title: "Hero Slides",
    href: "/admin/hero-slides",
    icon: MonitorPlay,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Subscribers",
    href: "/admin/subscribers",
    icon: Users,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center px-6 border-b border-gray-800">
        <span className="text-xl font-bold text-green-500">ION Green Admin</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
