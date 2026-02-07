
"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import HeroSlideForm from "@/components/admin/hero-slide-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [slide, setSlide] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlide();
  }, [unwrappedParams.id]);

  async function fetchSlide() {
    try {
      const res = await fetch(`/api/hero-slides/${unwrappedParams.id}`);
      const data = await res.json();
      if (data.success) {
        setSlide(data.data);
      } else {
        toast.error("Failed to fetch slide");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load slide");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!slide) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500">
        Slide not found
      </div>
    );
  }

  return <HeroSlideForm initialData={slide} isEditing={true} />;
}
