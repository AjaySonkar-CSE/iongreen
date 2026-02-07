import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getDbPool } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function getHeroSlides() {
  const pool = getDbPool();
  // Get all slides, even inactive ones, for admin management
  const [rows] = await pool.query(
    "SELECT * FROM hero_slides ORDER BY position ASC, created_at DESC"
  ) as unknown as [Array<any>];
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
    await pool.query(
      "UPDATE hero_slides SET is_active = ? WHERE id = ?",
      [!currentStatus, id]
    );
    revalidatePath("/admin/hero-slides");
  } catch (error) {
    console.error("Failed to update slide status:", error);
    throw new Error("Failed to update slide status");
  }
}

export default async function HeroSlidesPage() {
  const slides = await getHeroSlides();

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

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Title / Description</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {slides.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No slides found. Create one to get started.
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
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          {slide.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <form action={toggleSlideStatus.bind(null, slide.id, Boolean(slide.is_active))}>
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            slide.is_active
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
