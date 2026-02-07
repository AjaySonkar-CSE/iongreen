"use server";

import { revalidatePath } from "next/cache";
import { getDbPool } from "@/lib/db";

export async function deleteHeroSlide(id: number) {
  try {
    const pool = getDbPool();
    await pool.query("DELETE FROM hero_slides WHERE id = ?", [id]);
    revalidatePath("/admin/hero-slides");
  } catch (error) {
    console.error("Failed to delete hero slide:", error);
    throw new Error("Failed to delete hero slide");
  }
}

export async function toggleHeroSlideStatus(id: number, currentStatus: boolean) {
  try {
    const pool = getDbPool();
    await pool.query(
      "UPDATE hero_slides SET is_active = ? WHERE id = ?",
      [!currentStatus, id]
    );
    revalidatePath("/admin/hero-slides");
  } catch (error) {
    console.error("Failed to update hero slide status:", error);
    throw new Error("Failed to update hero slide status");
  }
}