
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp, GripVertical, Image as ImageIcon, FileText, Package, X } from "lucide-react";
import { ImageUpload } from "./image-upload";

interface ProductFormProps {
  productId?: number;
  initialData?: any;
}

interface GalleryItem {
  image_url: string;
  title: string;
  description: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface SpecItem {
  label: string;
  value: string;
}

interface SimpleItem {
  text: string;
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  features: FeatureItem[];
  specifications: SpecItem[];
  applications: SimpleItem[];
  benefits: SimpleItem[];
  image_url: string;
  category: string;
  gallery: GalleryItem[];
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
  const [activeTab, setActiveTab] = useState<'details' | 'features' | 'gallery'>('details');
  const [expandedGallery, setExpandedGallery] = useState<number | null>(null);
  const isEditing = !!productId;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      features: [],
      specifications: [],
      applications: [],
      benefits: [],
      image_url: "",
      category: "",
      gallery: [],
      is_active: true,
      is_featured: false,
    },
  });

  // Field arrays for dynamic lists
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "features" });
  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({ control, name: "specifications" });
  const { fields: appFields, append: appendApp, remove: removeApp } = useFieldArray({ control, name: "applications" });
  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: "benefits" });
  const { fields: galleryFields, append: appendGallery, remove: removeGallery, move: moveGallery } = useFieldArray({ control, name: "gallery" });

  const imageUrl = watch("image_url");

  useEffect(() => {
    if (initialData) {
      // Parse features
      let features: FeatureItem[] = [];
      if (initialData.features) {
        try {
          const f = typeof initialData.features === 'string' ? JSON.parse(initialData.features) : initialData.features;
          if (Array.isArray(f)) {
            features = f.map((item: any) => {
              if (typeof item === 'string') return { title: item, description: '' };
              return { title: item.title || '', description: item.description || '' };
            });
          }
        } catch { features = []; }
      }

      // Parse specifications
      let specifications: SpecItem[] = [];
      if (initialData.specifications) {
        try {
          const s = typeof initialData.specifications === 'string' ? JSON.parse(initialData.specifications) : initialData.specifications;
          if (Array.isArray(s)) {
            specifications = s.map((item: any) => ({ label: item.label || '', value: item.value || '' }));
          } else if (typeof s === 'object' && s !== null) {
            // Handle object format like { range: "100kWh" }
            specifications = Object.entries(s).map(([key, val]) => ({ label: key, value: String(val) }));
          }
        } catch { specifications = []; }
      }

      // Parse applications
      let applications: SimpleItem[] = [];
      if (initialData.applications) {
        try {
          const a = typeof initialData.applications === 'string' ? JSON.parse(initialData.applications) : initialData.applications;
          if (Array.isArray(a)) {
            applications = a.map((item: any) => ({ text: typeof item === 'string' ? item : (item.text || '') }));
          }
        } catch { applications = []; }
      }

      // Parse benefits
      let benefits: SimpleItem[] = [];
      if (initialData.benefits) {
        try {
          const b = typeof initialData.benefits === 'string' ? JSON.parse(initialData.benefits) : initialData.benefits;
          if (Array.isArray(b)) {
            benefits = b.map((item: any) => ({ text: typeof item === 'string' ? item : (item.text || '') }));
          }
        } catch { benefits = []; }
      }

      // Parse gallery
      let gallery: GalleryItem[] = [];
      if (initialData.gallery) {
        try {
          const g = typeof initialData.gallery === 'string' ? JSON.parse(initialData.gallery) : initialData.gallery;
          gallery = (g || []).map((item: any) => ({
            image_url: item.image_url || "",
            title: item.title || "",
            description: item.description || "",
          }));
        } catch { gallery = []; }
      }

      reset({
        name: initialData.name || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        image_url: initialData.image_url || '',
        category: initialData.category || '',
        is_active: initialData.is_active ?? true,
        is_featured: initialData.is_featured ?? false,
        features,
        specifications,
        applications,
        benefits,
        gallery,
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
      // Convert field arrays back to the API format
      const formattedData: any = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        image_url: data.image_url,
        category: data.category,
        is_active: data.is_active,
        is_featured: data.is_featured,
        gallery: data.gallery,
        // Features: array of { title, description }
        features: data.features.filter(f => f.title.trim()).map(f => ({
          title: f.title.trim(),
          description: f.description.trim()
        })),
        // Specifications: array of { label, value }
        specifications: data.specifications.filter(s => s.label.trim()).map(s => ({
          label: s.label.trim(),
          value: s.value.trim()
        })),
        // Applications: array of strings
        applications: data.applications.filter(a => a.text.trim()).map(a => a.text.trim()),
        // Benefits: array of strings
        benefits: data.benefits.filter(b => b.text.trim()).map(b => b.text.trim()),
      };

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
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
                ? "Update product details, features, specifications & gallery"
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
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'details' as const, label: 'Product Details', icon: Package },
            { key: 'features' as const, label: 'Features & Specs', icon: FileText },
            { key: 'gallery' as const, label: `Gallery Images (${galleryFields.length})`, icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key
                ? 'text-green-600 border-green-600 bg-green-50/50'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ═══════════════ TAB 1: Product Details ═══════════════ */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 bg-gray-50 font-mono text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
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
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Product description..."
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Visibility</label>
                    <p className="text-xs text-gray-500">Product visibility on the website</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("is_active")}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("is_featured")}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-600">Featured</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Main Image */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Product Image</h3>
                  <ImageUpload
                    value={imageUrl || ""}
                    onChange={(value) => setValue("image_url", value)}
                    label="Main Image"
                    placeholder="https://... or upload"
                  />
                  <p className="text-xs text-gray-400">This is the primary product image shown in listings.</p>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ TAB 2: Features & Specs ═══════════════ */}
          {activeTab === 'features' && (
            <div className="space-y-8">

              {/* ─── Features ─── */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Features</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Add product features with title and description</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendFeature({ title: "", description: "" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Feature
                  </button>
                </div>

                {featureFields.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                    <p className="text-sm text-gray-400">No features added yet</p>
                  </div>
                )}

                <div className="space-y-3">
                  {featureFields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-start bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold mt-1">{index + 1}</span>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          {...register(`features.${index}.title` as const)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          placeholder="Feature title"
                        />
                        <input
                          {...register(`features.${index}.description` as const)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          placeholder="Feature description"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="flex-shrink-0 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* ─── Specifications ─── */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Specifications</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Add product specifications with label and value</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendSpec({ label: "", value: "" })}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Specification
                  </button>
                </div>

                {specFields.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                    <p className="text-sm text-gray-400">No specifications added yet</p>
                  </div>
                )}

                <div className="space-y-3">
                  {specFields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-start bg-blue-50/30 rounded-lg p-3 border border-blue-100">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold mt-1">{index + 1}</span>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          {...register(`specifications.${index}.label` as const)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          placeholder="e.g. Capacity, Voltage, Weight"
                        />
                        <input
                          {...register(`specifications.${index}.value` as const)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          placeholder="e.g. 100kWh, 48V, 25kg"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        className="flex-shrink-0 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* ─── Applications & Benefits Side by Side ─── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Applications */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Applications</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Where this product can be used</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendApp({ text: "" })}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add
                    </button>
                  </div>

                  {appFields.length === 0 && (
                    <div className="text-center py-6 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                      <p className="text-sm text-gray-400">No applications added</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {appFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <span className="flex-shrink-0 text-xs text-gray-400 w-5 text-right">{index + 1}.</span>
                        <input
                          {...register(`applications.${index}.text` as const)}
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          placeholder="e.g. Residential, Industrial, Commercial"
                        />
                        <button
                          type="button"
                          onClick={() => removeApp(index)}
                          className="flex-shrink-0 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Benefits</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Key advantages of this product</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => appendBenefit({ text: "" })}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add
                    </button>
                  </div>

                  {benefitFields.length === 0 && (
                    <div className="text-center py-6 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                      <p className="text-sm text-gray-400">No benefits added</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {benefitFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <span className="flex-shrink-0 text-xs text-gray-400 w-5 text-right">{index + 1}.</span>
                        <input
                          {...register(`benefits.${index}.text` as const)}
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          placeholder="e.g. High efficiency, Low maintenance"
                        />
                        <button
                          type="button"
                          onClick={() => removeBenefit(index)}
                          className="flex-shrink-0 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ TAB 3: Gallery Images ═══════════════ */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Header with count */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {galleryFields.length} gallery image{galleryFields.length !== 1 ? 's' : ''} added
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    These images appear in the product gallery section alongside the main product image.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => appendGallery({ image_url: "", title: "", description: "" })}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Gallery Image
                </button>
              </div>

              {/* Gallery Items */}
              <div className="space-y-4">
                {galleryFields.map((field, index) => {
                  const isExpanded = expandedGallery === index;
                  const currentUrl = watch(`gallery.${index}.image_url`);

                  return (
                    <div key={field.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {/* Collapsed Header */}
                      <div
                        className="flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => setExpandedGallery(isExpanded ? null : index)}
                      >
                        <GripVertical className="h-4 w-4 text-gray-300 flex-shrink-0" />

                        {/* Thumbnail */}
                        <div className="w-14 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          {currentUrl ? (
                            <img src={currentUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-4 w-4 text-gray-300" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex w-6 h-6 rounded-full bg-green-500 text-white items-center justify-center text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="font-medium text-sm text-gray-800 truncate">
                              {watch(`gallery.${index}.title`) || `Gallery Image ${index + 1}`}
                            </span>
                            {currentUrl && (
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">
                                Has Image
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); moveGallery(index, index - 1); }}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                          )}
                          {index < galleryFields.length - 1 && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); moveGallery(index, index + 1); }}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeGallery(index); }}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 p-5 space-y-5 bg-gray-50/50">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Image Upload */}
                            <div className="space-y-4">
                              <ImageUpload
                                value={currentUrl}
                                onChange={(value) => setValue(`gallery.${index}.image_url`, value)}
                                label={`Image ${index + 1}`}
                                placeholder="Image URL or upload..."
                              />
                            </div>

                            {/* Title & Description */}
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Title</label>
                                <input
                                  {...register(`gallery.${index}.title` as const)}
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                  placeholder="e.g. Product Front View, Installation Setup..."
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Description</label>
                                <textarea
                                  {...register(`gallery.${index}.description` as const)}
                                  rows={4}
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                  placeholder="Describe this image — what it shows, the angle, use case..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {galleryFields.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-sm font-medium text-gray-700 mb-1">No Gallery Images</h3>
                  <p className="text-xs text-gray-400 mb-4 max-w-sm mx-auto">
                    Add multiple images of your product from different angles, installation views, or application scenarios.
                  </p>
                  <button
                    type="button"
                    onClick={() => appendGallery({ image_url: "", title: "", description: "" })}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Gallery Image
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
