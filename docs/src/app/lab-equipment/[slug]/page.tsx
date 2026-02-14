import { notFound } from "next/navigation";
import Image from "next/image";
import { dbService } from "@/lib/db-service";

import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";
import { Hero } from "@/components/hero";

interface LabEquipmentPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function LabEquipmentDetailPage(props: LabEquipmentPageProps) {
  const { slug } = await props.params;

  const item = await dbService.getLabEquipmentBySlug(slug);
  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Hero page="lab-equipment">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">{item.name}</h1>
        </div>
      </Hero>

      <AnimatedContentWrapper>
        <div className="max-w-4xl mx-auto px-4 py-24 bg-white min-h-screen">
          <div className="relative h-96 w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/image2.png"
              alt={item.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
          <p className="text-xl text-slate-700 leading-relaxed">{item.description}</p>
        </div>
      </AnimatedContentWrapper>
    </div>
  );
}

