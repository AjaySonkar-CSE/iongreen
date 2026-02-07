
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { ImageUpload } from "./image-upload";

interface NewsFormProps {
  newsId?: number;
  initialData?: any;
}

interface NewsFormData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  published_at: string;
  is_active: boolean;
}

export function NewsForm({ newsId, initialData }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!newsId;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<NewsFormData>({
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      image_url: "",
      published_at: new Date().toISOString().split("T")[0],
      is_active: true,
    },
  });

  const imageUrl = watch("image_url");

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        published_at: initialData.published_at
          ? new Date(initialData.published_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
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

  const onSubmit = async (data: NewsFormData) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/news/${newsId}` : "/api/news";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(
          isEditing ? "News article updated successfully" : "News article created successfully"
        );
        router.push("/admin/news");
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
            href="/admin/news"
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Article" : "New Article"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing
                ? "Update existing news article"
                : "Create a new news article or publication"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
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
            {isEditing ? "Update Article" : "Create Article"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Article Details</h2>
            
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  onChange={(e) => {
                    register("title").onChange(e);
                    handleTitleChange(e);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Enter article title"
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
                  placeholder="article-slug"
                />
                {errors.slug && (
                  <p className="text-xs text-red-500">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Summary</label>
                <textarea
                  {...register("summary")}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Brief summary of the article..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Content</label>
                <textarea
                  {...register("content")}
                  rows={10}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Full article content..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Status & Date */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Publishing</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("is_active")}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">Active</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Published Date</label>
                <input
                  type="date"
                  {...register("published_at")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Media</h2>
            
            <ImageUpload
              value={imageUrl || ""}
              onChange={(value) => setValue("image_url", value)}
              label="Image URL"
              placeholder="https://... or upload an image"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
