// src/app/lab-equipment/page.tsx

import { LabEquipmentClient } from "@/components/lab-equipment-client";
import { dbService } from "@/lib/db-service";

// Enable ISR (Incremental Static Regeneration) with a revalidation period
export const revalidate = 60; // Revalidate at most every 60 seconds

interface LabEquipment {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export default async function LabEquipmentPage() {
  // Use static data from the client component to ensure images match the home page
  let equipmentItems: LabEquipment[] = [];
  let error: string | null = null;

  // Use real data from the database
  try {
    // Fetch lab equipment directly from the database
    equipmentItems = await dbService.getLabEquipment();
  } catch (err) {
    console.error("Failed to fetch lab equipment:", err);
    error = "Failed to load lab equipment. Please try again later.";
  }

  return <LabEquipmentClient equipmentItems={equipmentItems} error={error} />;
}