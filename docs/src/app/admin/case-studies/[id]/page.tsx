
"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { CaseStudyForm } from "@/components/admin/case-study-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudy();
  }, [unwrappedParams.id]);

  async function fetchCaseStudy() {
    try {
      const res = await fetch(`/api/case-studies/${unwrappedParams.id}`);
      const data = await res.json();
      if (data.success) {
        setCaseStudy(data.data);
      } else {
        toast.error("Failed to fetch case study");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load case study");
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

  if (!caseStudy) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500">
        Case Study not found
      </div>
    );
  }

  return <CaseStudyForm caseStudyId={Number(unwrappedParams.id)} initialData={caseStudy} />;
}
