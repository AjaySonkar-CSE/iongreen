
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { ImageUpload } from "./image-upload";

interface LabEquipmentFormProps {
  equipmentId?: number;
  initialData?: any;
}

interface LabEquipmentFormData {
  name: string;
  slug: string;
  description: string;
  category: string;
  image_url: string;
  is_active: boolean;
}

export function LabEquipmentForm({ equipmentId, initialData }: LabEquipmentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!equipmentId;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<LabEquipmentFormData>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      category: "",
      image_url: "",
      is_active: true,
    },
  });

  const imageUrl = watch("image_url");

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      const slug = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", slug);
    }
  };

  const onSubmit = async (data: LabEquipmentFormData) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/lab-equipment/${equipmentId}` : "/api/lab-equipment";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(
          isEditing ? "Equipment updated successfully" : "Equipment added successfully"
        );
        router.push("/admin/lab-equipment");
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
            href="/admin/lab-equipment"
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Equipment" : "Add Equipment"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing
                ? "Update existing lab equipment"
                : "Add new equipment to the catalog"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/lab-equipment"
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
            {isEditing ? "Update Equipment" : "Add Equipment"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Equipment Details</h2>
            
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  onChange={(e) => {
                    register("name").onChange(e);
                    handleNameChange(e);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Enter equipment name"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("slug", { required: "Slug is required" })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 font-mono text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="equipment-slug"
                />
                {errors.slug && (
                  <p className="text-xs text-red-500">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <input
                  {...register("category")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="e.g. Microscopes, Centrifuges"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register("description")}
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Detailed description of the equipment..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Visibility</h2>
            
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
