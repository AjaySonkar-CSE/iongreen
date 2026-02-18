"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowLeft, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const heroSlideSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().min(1, "Image URL is required"),
  cta_label: z.string(),
  cta_href: z.string(),
  category: z.string(),
  position: z.number().int().min(0),
  is_active: z.boolean(),
});

type HeroSlideFormValues = z.infer<typeof heroSlideSchema>;

interface HeroSlideFormProps {
  initialData?: HeroSlideFormValues & { id: number };
  isEditing?: boolean;
}

export default function HeroSlideForm({ initialData, isEditing = false }: HeroSlideFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HeroSlideFormValues>({
    resolver: zodResolver(heroSlideSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      image_url: "",
      cta_label: "",
      cta_href: "",
      category: "",
      position: 0,
      is_active: true,
    },
    mode: "onChange",
  });

  const imageUrl = watch("image_url");

  const onSubmit = async (data: HeroSlideFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const url = isEditing
        ? `/api/hero-slides/${initialData?.id}`
        : "/api/hero-slides";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save hero slide");
      }

      router.push("/admin/hero-slides");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, JPEG, PNG, and WebP are allowed.");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setValue('image_url', data.url, { shouldValidate: true });
        toast.success("Image uploaded successfully");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred during upload");
    } finally {
      setUploading(false);
      // Reset input value to allow uploading the same file again
      if (e.target) e.target.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/hero-slides"
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Hero Slides
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Edit Hero Slide" : "Create New Hero Slide"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                {...register("title")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Slide Title"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Slide Description"
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <input
                  {...register("category")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="e.g. Energy Storage"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Position</label>
                <input
                  type="number"
                  {...register("position", { valueAsNumber: true })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <label className="relative cursor-pointer group">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors">
                    {uploading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload Image</span>
                      </>
                    )}
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  {...register("image_url")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 pr-10"
                  placeholder="/images/..."
                />
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setValue("image_url", "", { shouldValidate: true })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {errors.image_url && (
                <p className="text-red-500 text-xs">{errors.image_url.message}</p>
              )}

              <div className="mt-2 relative h-48 w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
                    <Upload className="h-8 w-8 mb-2 opacity-20" />
                    <span className="text-xs">No image selected</span>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Loader2 className="h-5 w-5 animate-spin text-green-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">CTA Label</label>
                <input
                  {...register("cta_label")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="e.g. Learn More"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">CTA Link</label>
                <input
                  {...register("cta_href")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="/products/..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <input
                type="checkbox"
                {...register("is_active")}
                id="is_active"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active (Visible on site)
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <Link
            href="/admin/hero-slides"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isEditing ? "Update Slide" : "Create Slide"}
          </button>
        </div>
      </form>
    </div>
  );
}
