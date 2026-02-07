
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Newspaper,
  FlaskConical,
  Lightbulb,
  Briefcase,
  Images,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Newspaper, label: "News", href: "/admin/news" },
  { icon: FlaskConical, label: "Lab Equipment", href: "/admin/lab-equipment" },
  { icon: Lightbulb, label: "Solutions", href: "/admin/solutions" },
  { icon: Briefcase, label: "Case Studies", href: "/admin/case-studies" },
  { icon: Images, label: "Hero Slides", href: "/admin/hero-slides" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <span className="text-xl font-bold text-green-600">GreenAdmin</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex flex-col h-[calc(100vh-4rem)] justify-between p-3">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  collapsed && "justify-center"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-green-600")} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-gray-200 pt-3">
          <button
            className={cn(
              "flex w-full items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors",
              collapsed && "justify-center"
            )}
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="font-medium">Settings</span>}
          </button>
          <button
            className={cn(
              "flex w-full items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
