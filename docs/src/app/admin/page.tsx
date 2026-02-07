
"use client";

import { useEffect, useState } from "react";
import { 
  Package, 
  Newspaper, 
  FlaskConical, 
  Lightbulb, 
  Briefcase, 
  Images,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import Link from "next/link";

interface Stats {
  products: number;
  news: number;
  lab_equipment: number;
  solutions: number;
  case_studies: number;
  hero_slides: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    news: 0,
    lab_equipment: 0,
    solutions: 0,
    case_studies: 0,
    hero_slides: 0,
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "text-blue-700",
      bg: "bg-white/50",
      cardBg: "bg-blue-100",
      borderColor: "border-blue-200",
      href: "/admin/products",
    },
    {
      title: "News Articles",
      value: stats.news,
      icon: Newspaper,
      color: "text-purple-700",
      bg: "bg-white/50",
      cardBg: "bg-purple-100",
      borderColor: "border-purple-200",
      href: "/admin/news",
    },
    {
      title: "Lab Equipment",
      value: stats.lab_equipment,
      icon: FlaskConical,
      color: "text-orange-700",
      bg: "bg-white/50",
      cardBg: "bg-orange-100",
      borderColor: "border-orange-200",
      href: "/admin/lab-equipment",
    },
    {
      title: "Solutions",
      value: stats.solutions,
      icon: Lightbulb,
      color: "text-yellow-700",
      bg: "bg-white/50",
      cardBg: "bg-yellow-100",
      borderColor: "border-yellow-200",
      href: "/admin/solutions",
    },
    {
      title: "Case Studies",
      value: stats.case_studies,
      icon: Briefcase,
      color: "text-green-700",
      bg: "bg-white/50",
      cardBg: "bg-green-100",
      borderColor: "border-green-200",
      href: "/admin/case-studies",
    },
    {
      title: "Hero Slides",
      value: stats.hero_slides,
      icon: Images,
      color: "text-pink-700",
      bg: "bg-white/50",
      cardBg: "bg-pink-100",
      borderColor: "border-pink-200",
      href: "/admin/hero-slides",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your website content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className={`group relative overflow-hidden rounded-xl border ${stat.borderColor} ${stat.cardBg} p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`rounded-lg p-3 ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-gray-600">
              <span className={`group-hover:${stat.color} group-hover:translate-x-1 transition-all flex items-center gap-1`}>
                View Details <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
