
"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { LabEquipmentForm } from "@/components/admin/lab-equipment-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditLabEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [equipment, setEquipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquipment();
  }, [unwrappedParams.id]);

  async function fetchEquipment() {
    try {
      const res = await fetch(`/api/lab-equipment/${unwrappedParams.id}`);
      const data = await res.json();
      if (data.success) {
        setEquipment(data.data);
      } else {
        toast.error("Failed to fetch equipment");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load equipment");
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

  if (!equipment) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500">
        Equipment not found
      </div>
    );
  }

  return <LabEquipmentForm equipmentId={Number(unwrappedParams.id)} initialData={equipment} />;
}
