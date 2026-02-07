import { notFound } from "next/navigation";
import Image from "next/image";
import { dbService } from "@/lib/db-service";

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
    <div className="min-h-screen bg-white">
      <div className="relative h-96 w-full">
        <Image
          src="/image2.png"
          alt={item.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{item.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-lg text-slate-700 mb-6">{item.description}</p>
      </div>
    </div>
  );
}

