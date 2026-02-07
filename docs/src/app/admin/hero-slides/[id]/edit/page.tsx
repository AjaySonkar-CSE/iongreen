import { notFound } from "next/navigation";
import { getDbPool } from "@/lib/db";
import HeroSlideEditWrapper from "@/components/admin/hero-slide-edit-wrapper";

interface EditHeroSlidePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditHeroSlidePage({ params }: EditHeroSlidePageProps) {
  const { id } = await params;
  
  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const pool = getDbPool();
  const [rows] = await pool.query(
    "SELECT * FROM hero_slides WHERE id = ?",
    [id]
  ) as unknown as [Array<any>];

  if (!rows || rows.length === 0) {
    notFound();
  }

  const slide = rows[0];
  const formattedSlide = {
    ...slide,
    is_active: Boolean(slide.is_active),
    cta_label: slide.cta_label || undefined,
    cta_href: slide.cta_href || undefined,
    category: slide.category || undefined,
  };

  return <HeroSlideEditWrapper params={params} initialSlideData={formattedSlide} />;
}
