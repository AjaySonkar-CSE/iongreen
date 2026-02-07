
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Star, StarOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  image_url: string;
  is_featured: boolean;
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  async function fetchCaseStudies() {
    try {
      const res = await fetch("/api/case-studies?all=true");
      const data = await res.json();
      if (data.success) {
        setCaseStudies(data.data);
      } else {
        toast.error("Failed to fetch case studies");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load case studies");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const res = await fetch(`/api/case-studies/${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (data.success) {
        toast.success("Case study deleted successfully");
        fetchCaseStudies();
      } else {
        toast.error(data.message || "Failed to delete case study");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting");
    }
  }

  const filteredCaseStudies = caseStudies.filter((study) =>
    study.title.toLowerCase().includes(search.toLowerCase()) ||
    study.client_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Studies</h1>
          <p className="text-sm text-gray-500">Manage client success stories and projects</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Case Study
        </Link>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search case studies..."
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
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Industry</th>
                <th className="px-6 py-4 font-medium">Featured</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Loading case studies...
                  </td>
                </tr>
              ) : filteredCaseStudies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No case studies found
                  </td>
                </tr>
              ) : (
                filteredCaseStudies.map((study) => (
                  <tr key={study.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                          {study.image_url ? (
                            <Image
                              src={study.image_url}
                              alt={study.title}
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
                          <div className="font-medium text-gray-900">{study.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[200px]">{study.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{study.client_name || "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{study.industry || "-"}</td>
                    <td className="px-6 py-4">
                      {study.is_featured ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          <StarOff className="h-3 w-3" />
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/case-studies/${study.id}`}
                          className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(study.id)}
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
