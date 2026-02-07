
"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { SolutionForm } from "@/components/admin/solution-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditSolutionPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [solution, setSolution] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolution();
  }, [unwrappedParams.id]);

  async function fetchSolution() {
    try {
      const res = await fetch(`/api/solutions/${unwrappedParams.id}`);
      const data = await res.json();
      if (data.success) {
        setSolution(data.data);
      } else {
        toast.error("Failed to fetch solution");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load solution");
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

  if (!solution) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500">
        Solution not found
      </div>
    );
  }

  return <SolutionForm solutionId={Number(unwrappedParams.id)} initialData={solution} />;
}
