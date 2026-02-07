
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { ImageUpload } from "./image-upload";

interface ProductFormProps {
  productId?: number;
  initialData?: any;
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  features: string;
  specifications: string;
  applications: string;
  benefits: string;
  image_url: string;
  category: string;
  is_active: boolean;
  is_featured: boolean;
}

const CATEGORIES = [
  { label: "Energy Storage System", value: "energy-storage-system" },
  { label: "Solar Solution", value: "solar-solution" },
  { label: "Hybrid Solar System", value: "hybrid-solar-system" },
  { label: "Hydrogen Pules", value: "hydrogen-pules" },
  { label: "EV Vehicles", value: "ev-vehicles" },
  { label: "Drone", value: "drone" },
  { label: "Flipkart & Amazon", value: "flipkart-amazon" }
];

export function ProductForm({ productId, initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!productId;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      features: "",
      specifications: "",
      applications: "",
      benefits: "",
      image_url: "",
      category: "",
      is_active: true,
      is_featured: false,
    },
  });

  const imageUrl = watch("image_url");

  useEffect(() => {
    if (initialData) {
      // Helper to format JSON/Array back to string for textarea
      const formatField = (value: any) => {
        if (!value) return "";
        if (typeof value === "string") return value;
        return JSON.stringify(value, null, 2);
      };

      reset({
        ...initialData,
        features: formatField(initialData.features),
        specifications: formatField(initialData.specifications),
        applications: formatField(initialData.applications),
        benefits: formatField(initialData.benefits),
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

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      // Parse JSON fields if they are strings
      const formattedData: any = { ...data };
      
      // Helper to try parsing JSON or converting text to array/object
      const processField = (value: string, type: 'array' | 'object-array' | 'kv-array') => {
        if (!value) return null;
        try {
          // Try parsing as JSON first
          return JSON.parse(value);
        } catch (e) {
          // If not JSON, convert based on type
          if (type === 'array') {
            // Split by newline and remove empty strings
            return value.split('\n').map(s => s.trim()).filter(Boolean);
          } else if (type === 'kv-array') {
             // "Label: Value" format
             return value.split('\n').map(s => {
               const [label, ...rest] = s.split(':');
               if (label && rest.length) {
                 return { label: label.trim(), value: rest.join(':').trim() };
               }
               return null;
             }).filter(Boolean);
          } else if (type === 'object-array') {
            // "Title: Description" format
            return value.split('\n').map(s => {
              const [title, ...rest] = s.split(':');
              if (title && rest.length) {
                return { title: title.trim(), description: rest.join(':').trim() };
              }
              return null;
            }).filter(Boolean);
          }
        }
        return value;
      };

      formattedData.features = processField(data.features, 'object-array');
      formattedData.specifications = processField(data.specifications, 'kv-array');
      formattedData.applications = processField(data.applications, 'array');
      formattedData.benefits = processField(data.benefits, 'array');

      const url = isEditing ? `/api/products/${productId}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(
          isEditing ? "Product updated successfully" : "Product created successfully"
        );
        router.push("/admin/products");
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
            href="/admin/products"
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Product" : "New Product"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing
                ? "Update existing product details"
                : "Add a new product to your catalog"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
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
            {isEditing ? "Update Product" : "Create Product"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
            
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  onChange={(e) => {
                    register("name").onChange(e);
                    handleTitleChange(e);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="e.g. Eco-Friendly Solar Panel"
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
                  placeholder="product-slug"
                />
                {errors.slug && (
                  <p className="text-xs text-red-500">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  {...register("category")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Product description..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Features (JSON)</label>
                <textarea
                  {...register("features")}
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 font-mono text-sm"
                  placeholder={'[\n  {\n    "title": "Feature Name",\n    "description": "Feature Description"\n  }\n]'}
                />
                <p className="text-xs text-gray-500">Format: Array of objects with title and description</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Specifications (JSON)</label>
                <textarea
                  {...register("specifications")}
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 font-mono text-sm"
                  placeholder={'[\n  {\n    "label": "Capacity",\n    "value": "100kWh"\n  }\n]'}
                />
                <p className="text-xs text-gray-500">Format: Array of objects with label and value</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Applications (JSON)</label>
                <textarea
                  {...register("applications")}
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 font-mono text-sm"
                  placeholder={'[\n  "Application 1",\n  "Application 2"\n]'}
                />
                <p className="text-xs text-gray-500">Format: Array of strings</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Benefits (JSON)</label>
                <textarea
                  {...register("benefits")}
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 font-mono text-sm"
                  placeholder={'[\n  "Benefit 1",\n  "Benefit 2"\n]'}
                />
                <p className="text-xs text-gray-500">Format: Array of strings</p>
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
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Product Image</h2>
            
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
