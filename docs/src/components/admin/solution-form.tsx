
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp, GripVertical, Image as ImageIcon, FileText, Eye } from "lucide-react";
import { ImageUpload } from "./image-upload";

interface SolutionFormProps {
  solutionId?: number;
  initialData?: any;
}

interface GalleryItem {
  image_url: string;
  title: string;
  description: string;
}

interface SolutionFormData {
  title: string;
  slug: string;
  summary: string;
  description: string;
  image_url: string;
  gallery: GalleryItem[];
  is_active: boolean;
}

export function SolutionForm({ solutionId, initialData }: SolutionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'description' | 'gallery'>('details');
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedGallery, setExpandedGallery] = useState<number | null>(null);
  const isEditing = !!solutionId;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<SolutionFormData>({
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      description: "",
      image_url: "",
      gallery: [],
      is_active: true,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "gallery",
  });

  const imageUrl = watch("image_url");
  const description = watch("description");
  const galleryItems = watch("gallery");

  useEffect(() => {
    if (initialData) {
      // Ensure gallery items have title field
      const data = {
        ...initialData,
        gallery: (initialData.gallery || []).map((g: any) => ({
          image_url: g.image_url || "",
          title: g.title || "",
          description: g.description || "",
        })),
      };
      reset(data);
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

  // Parse description into sections for preview
  const parseDescSections = (desc: string) => {
    const lines = desc.split('\n').map(l => l.trim()).filter(Boolean);
    const sections: { heading: string; items: string[] }[] = [];
    let current: { heading: string; items: string[] } | null = null;

    for (const line of lines) {
      const isBullet = /^[•\-*]/.test(line) || /^\d+[\.)]/.test(line);
      const isHeading = !isBullet && line.endsWith(':') && line.length < 80;

      if (isHeading) {
        if (current) sections.push(current);
        current = { heading: line.replace(/:$/, ''), items: [] };
      } else if (isBullet) {
        if (!current) current = { heading: 'Details', items: [] };
        current.items.push(line.replace(/^[•\-*]\s*/, '').replace(/^\d+[\.)]\s*/, '').trim());
      } else {
        if (!current) current = { heading: 'About', items: [] };
        current.items.push(line);
      }
    }
    if (current && current.items.length > 0) sections.push(current);
    return sections;
  };

  const descSections = parseDescSections(description || '');

  const onSubmit = async (data: SolutionFormData) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/solutions/${solutionId}` : "/api/solutions";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(
          isEditing ? "Solution updated successfully" : "Solution created successfully"
        );
        router.push("/admin/solutions");
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

  // Add a new description section heading
  const addDescriptionSection = (heading: string) => {
    const current = description || '';
    const newSection = current ? `\n\n${heading}:\n` : `${heading}:\n`;
    setValue('description', current + newSection);
  };

  // Quick-add templates for description
  const sectionTemplates = [
    'What We Offer',
    'Key Features',
    'Applications',
    'Technical Specifications',
    'Benefits',
    'Why Choose Us',
    'Project Models',
    'After-Sales Services',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/solutions"
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Solution" : "New Solution"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing
                ? "Update solution details, description, gallery & highlights"
                : "Create a new business solution"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/solutions"
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
            {isEditing ? "Update Solution" : "Create Solution"}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'details' as const, label: 'Basic Details', icon: FileText },
            { key: 'description' as const, label: 'Description & Highlights', icon: FileText },
            { key: 'gallery' as const, label: `Gallery Images (${fields.length})`, icon: ImageIcon },
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
          {/* TAB 1: Basic Details */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Enter solution title"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 bg-gray-50 font-mono text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="solution-slug"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Brief summary of the solution (shown in listings and hero)..."
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <p className="text-xs text-gray-500">Solution visibility on the website</p>
                  </div>
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

              {/* Sidebar - Hero Image */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Hero Image</h3>
                  <ImageUpload
                    value={imageUrl || ""}
                    onChange={(value) => setValue("image_url", value)}
                    label="Main Image"
                    placeholder="https://... or upload"
                  />
                  <p className="text-xs text-gray-400">This image is shown as the background in the hero section and overview.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Description & Highlights */}
          {activeTab === 'description' && (
            <div className="space-y-6">
              {/* Quick Add Section Templates */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quick Add Section:</span>
                {sectionTemplates.map((tmpl) => (
                  <button
                    key={tmpl}
                    type="button"
                    onClick={() => addDescriptionSection(tmpl)}
                    className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full hover:bg-green-100 transition-colors"
                  >
                    + {tmpl}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Description Editor</label>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600"
                    >
                      <Eye className="h-3 w-3" />
                      {previewMode ? 'Hide Preview' : 'Show Preview'}
                    </button>
                  </div>
                  <textarea
                    {...register("description")}
                    rows={24}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm leading-relaxed focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 resize-y"
                    placeholder={`Write solution description with sections.

Format:
Section Heading:
Item 1
Item 2
- Bullet item
- Another bullet

Another Section:
Description text here
- Feature 1
- Feature 2`}
                  />
                  <p className="text-xs text-gray-400">
                    Lines ending with <code className="bg-gray-100 px-1 rounded">:</code> become section headings.
                    Lines starting with <code className="bg-gray-100 px-1 rounded">-</code> become bullet points.
                    Other lines become paragraph text.
                  </p>
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Highlights Preview ({descSections.length} sections detected)
                  </label>
                  <div className="border border-gray-200 rounded-lg p-4 space-y-4 max-h-[600px] overflow-y-auto bg-gray-50">
                    {descSections.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 text-sm">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
                        <p>Start typing to see highlights preview</p>
                      </div>
                    ) : (
                      descSections.map((section, si) => {
                        const colors = ['green', 'blue', 'amber', 'purple', 'rose', 'teal'];
                        const color = colors[si % colors.length];
                        const galleryImage = galleryItems?.[si]?.image_url;

                        return (
                          <div key={si} className={`bg-white border-l-4 border-${color}-500 rounded-lg p-4 shadow-sm`}>
                            <div className="flex items-start gap-3">
                              {/* Gallery image thumbnail if mapped */}
                              {galleryImage && (
                                <img
                                  src={galleryImage}
                                  alt=""
                                  className="w-16 h-12 object-cover rounded-md flex-shrink-0"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`inline-flex w-5 h-5 rounded-full bg-${color}-500 text-white items-center justify-center text-xs font-bold`}>
                                    {si + 1}
                                  </span>
                                  <h4 className="font-bold text-sm text-gray-800">{section.heading}</h4>
                                  {galleryImage && (
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                      Has Image
                                    </span>
                                  )}
                                </div>
                                <ul className="space-y-1">
                                  {section.items.slice(0, 5).map((item, ii) => (
                                    <li key={ii} className="text-xs text-gray-600 flex items-start gap-1.5">
                                      <span className="text-green-500 mt-0.5">✓</span>
                                      {item}
                                    </li>
                                  ))}
                                  {section.items.length > 5 && (
                                    <li className="text-xs text-gray-400 italic">
                                      +{section.items.length - 5} more items...
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Info about gallery mapping */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                      <strong>Tip:</strong> Gallery images are mapped to highlights in order.
                      Gallery Image 1 → Highlight 1, Gallery Image 2 → Highlight 2, etc.
                      Add gallery images in the Gallery tab to pair them with each highlight.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Gallery Images */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Header with count and mapping info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {fields.length} gallery image{fields.length !== 1 ? 's' : ''} •
                    {descSections.length} highlight section{descSections.length !== 1 ? 's' : ''} detected
                  </p>
                  {fields.length < descSections.length && (
                    <p className="text-xs text-amber-600 mt-1">
                      ⚠ You have {descSections.length - fields.length} highlight section(s) without images. Add more gallery images to cover all highlights.
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => append({ image_url: "", title: "", description: "" })}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Gallery Image
                </button>
              </div>

              {/* Gallery Items */}
              <div className="space-y-4">
                {fields.map((field, index) => {
                  const isExpanded = expandedGallery === index;
                  const matchedSection = descSections[index];
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
                            {matchedSection && (
                              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex-shrink-0">
                                → {matchedSection.heading}
                              </span>
                            )}
                          </div>
                          {watch(`gallery.${index}.description`) && (
                            <p className="text-xs text-gray-400 truncate mt-0.5">
                              {watch(`gallery.${index}.description`)}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); move(index, index - 1); }}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                          )}
                          {index < fields.length - 1 && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); move(index, index + 1); }}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); remove(index); }}
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
                                  placeholder="e.g. Rooftop Solar Installation, Industrial BESS..."
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">Description</label>
                                <textarea
                                  {...register(`gallery.${index}.description` as const)}
                                  rows={4}
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                  placeholder="Describe this image — what it shows, the technology, the benefits..."
                                />
                              </div>

                              {/* Mapped highlight section info */}
                              {matchedSection && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                  <p className="text-xs text-green-700">
                                    <strong>Mapped to Highlight #{index + 1}:</strong> "{matchedSection.heading}"
                                    <br />
                                    <span className="text-green-600">
                                      This image will appear next to the "{matchedSection.heading}" section on the solution page.
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {fields.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-sm font-medium text-gray-700 mb-1">No Gallery Images</h3>
                  <p className="text-xs text-gray-400 mb-4 max-w-sm mx-auto">
                    Add gallery images to pair with your highlight sections. Each image appears alongside its matching highlight on the solution page.
                  </p>
                  <button
                    type="button"
                    onClick={() => append({ image_url: "", title: "", description: "" })}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Gallery Image
                  </button>
                </div>
              )}

              {/* Quick Add Multiple */}
              {fields.length > 0 && fields.length < descSections.length && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Missing Images for Highlights
                    </p>
                    <p className="text-xs text-amber-600 mt-0.5">
                      You have {descSections.length} highlight sections but only {fields.length} gallery images.
                      Sections without images will show a numbered placeholder.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const remaining = descSections.length - fields.length;
                      for (let i = 0; i < remaining; i++) {
                        append({ image_url: "", title: "", description: "" });
                      }
                    }}
                    className="flex-shrink-0 px-4 py-2 text-sm font-medium text-amber-700 bg-white border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    Add {descSections.length - fields.length} More
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
