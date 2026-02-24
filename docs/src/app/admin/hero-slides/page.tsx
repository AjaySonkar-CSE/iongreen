import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getDbPool } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const PAGE_OPTIONS = [
  { value: "", label: "All Pages" },
  { value: "home", label: "🏠 Home" },
  { value: "products", label: "📦 Products" },
  { value: "solutions", label: "💡 Solutions" },
  { value: "about", label: "ℹ️ About" },
  { value: "contact", label: "📞 Contact" },
  { value: "news", label: "📰 News" },
];

const PAGE_COLORS: Record<string, string> = {
  home: "bg-blue-50 text-blue-700 border-blue-200",
  products: "bg-purple-50 text-purple-700 border-purple-200",
  solutions: "bg-amber-50 text-amber-700 border-amber-200",
  about: "bg-teal-50 text-teal-700 border-teal-200",
  contact: "bg-pink-50 text-pink-700 border-pink-200",
  news: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

async function getHeroSlides(page?: string) {
  const pool = getDbPool();
  let query = "SELECT * FROM hero_slides";
  const params: any[] = [];

  if (page) {
    query += " WHERE category = ?";
    params.push(page);
  }

  query += " ORDER BY category ASC, position ASC, created_at DESC";

  const [rows] = (await pool.query(query, params)) as unknown as [
    Array<any>
  ];
  return rows || [];
}

async function deleteSlide(id: number) {
  "use server";
  try {
    const pool = getDbPool();
    await pool.query("DELETE FROM hero_slides WHERE id = ?", [id]);
    revalidatePath("/admin/hero-slides");
  } catch (error) {
    console.error("Failed to delete slide:", error);
    throw new Error("Failed to delete slide");
  }
}

async function toggleSlideStatus(id: number, currentStatus: boolean) {
  "use server";
  try {
    const pool = getDbPool();
    await pool.query("UPDATE hero_slides SET is_active = ? WHERE id = ?", [
      !currentStatus,
      id,
    ]);
    revalidatePath("/admin/hero-slides");
  } catch (error) {
    console.error("Failed to update slide status:", error);
    throw new Error("Failed to update slide status");
  }
}

function getPageLabel(category: string | null) {
  const found = PAGE_OPTIONS.find((p) => p.value === category);
  return found ? found.label : category || "-";
}

interface HeroSlidesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HeroSlidesPage({ searchParams }: HeroSlidesPageProps) {
  const { page: filterPage } = await searchParams;
  const slides = await getHeroSlides(filterPage || undefined);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hero Slides</h1>
        <Link
          href="/admin/hero-slides/new"
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <Plus size={20} />
          Add Slide
        </Link>
      </div>

      {/* Page Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {PAGE_OPTIONS.map((opt) => (
          <Link
            key={opt.value}
            href={opt.value ? `/admin/hero-slides?page=${opt.value}` : "/admin/hero-slides"}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${(filterPage || "") === opt.value
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Title / Description</th>
                <th className="px-6 py-3">Page</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {slides.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No slides found{filterPage ? ` for "${getPageLabel(filterPage)}" page` : ""}. Create one to get started.
                  </td>
                </tr>
              ) : (
                slides.map((slide) => (
                  <tr key={slide.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {slide.position}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative h-16 w-24 overflow-hidden rounded-md border border-gray-200">
                        {slide.image_url ? (
                          <Image
                            src={slide.image_url}
                            alt={slide.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{slide.title}</div>
                      <div className="mt-1 line-clamp-1 max-w-xs text-xs text-gray-500">
                        {slide.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {slide.category ? (
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${PAGE_COLORS[slide.category] || "bg-gray-50 text-gray-700 border-gray-200"
                            }`}
                        >
                          {getPageLabel(slide.category)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <form
                        action={toggleSlideStatus.bind(
                          null,
                          slide.id,
                          Boolean(slide.is_active)
                        )}
                      >
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${slide.is_active
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          {slide.is_active ? (
                            <>
                              <Eye size={12} /> Active
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} /> Inactive
                            </>
                          )}
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/hero-slides/${slide.id}/edit`}
                          className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <form action={deleteSlide.bind(null, slide.id)}>
                          <button
                            type="submit"
                            className="rounded p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
