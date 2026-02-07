
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface CaseStudyFormProps {
  caseStudyId?: number;
  initialData?: any;
}

interface CaseStudyFormData {
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
}

export function CaseStudyForm({ caseStudyId, initialData }: CaseStudyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!caseStudyId;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CaseStudyFormData>({
    defaultValues: {
      title: "",
      slug: "",
      client_name: "",
      industry: "",
      description: "",
      challenge: "",
      solution: "",
      results: "",
      image_url: "",
      is_featured: false,
      is_active: true,
    },
  });

  const imageUrl = watch("image_url");

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      const slug = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug);
    }
  };

  const onSubmit = async (data: CaseStudyFormData) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/case-studies/${caseStudyId}` : "/api/case-studies";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(
          isEditing ? "Case Study updated successfully" : "Case Study created successfully"
        );
        router.push("/admin/case-studies");
        router.refresh();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred while saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/case-studies"
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Case Study" : "New Case Study"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing
                ? "Update case study details"
                : "Add a new success story"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/case-studies"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isEditing ? "Update Case Study" : "Create Case Study"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
            
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  onChange={(e) => {
                    register("title").onChange(e);
                    handleTitleChange(e);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="e.g. Solar Installation for Tech Corp"
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("slug", { required: "Slug is required" })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 font-mono text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="project-slug"
                />
                {errors.slug && (
                  <p className="text-xs text-red-500">{errors.slug.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Client Name</label>
                  <input
                    {...register("client_name")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="e.g. Tech Corp Inc."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Industry</label>
                  <input
                    {...register("industry")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="e.g. Technology"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Overview</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Brief overview of the project..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">The Challenge</label>
                <textarea
                  {...register("challenge")}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="What challenges did the client face?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">The Solution</label>
                <textarea
                  {...register("solution")}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="How did we solve the problem?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">The Results</label>
                <textarea
                  {...register("results")}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="What were the outcomes?"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Featured</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("is_featured")}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">Show on home page</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Active</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("is_active")}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">Visible on site</span>
                </div>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Project Image</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <input
                  {...register("image_url")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="https://..."
                />
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="h-8 w-8 mb-2" />
                    <span className="text-xs">Image Preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
