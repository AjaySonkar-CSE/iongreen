
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface Solution {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  is_active: boolean;
}

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSolutions();
  }, []);

  async function fetchSolutions() {
    try {
      const res = await fetch("/api/solutions?all=true");
      const data = await res.json();
      if (data.success) {
        setSolutions(data.data);
      } else {
        toast.error("Failed to fetch solutions");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load solutions");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this solution?")) return;

    try {
      const res = await fetch(`/api/solutions/${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (data.success) {
        toast.success("Solution deleted successfully");
        fetchSolutions();
      } else {
        toast.error(data.message || "Failed to delete solution");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting");
    }
  }

  const filteredSolutions = solutions.filter((solution) =>
    solution.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solutions</h1>
          <p className="text-sm text-gray-500">Manage your business solutions</p>
        </div>
        <Link
          href="/admin/solutions/new"
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Solution
        </Link>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search solutions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Loading solutions...
                  </td>
                </tr>
              ) : filteredSolutions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No solutions found
                  </td>
                </tr>
              ) : (
                filteredSolutions.map((solution) => (
                  <tr key={solution.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                          {solution.image_url ? (
                            <Image
                              src={solution.image_url}
                              alt={solution.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{solution.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[200px]">{solution.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          solution.is_active
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {solution.is_active ? (
                          <>
                            <Eye className="h-3 w-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" />
                            Draft
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/solutions/${solution.id}`}
                          className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(solution.id)}
                          className="rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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
