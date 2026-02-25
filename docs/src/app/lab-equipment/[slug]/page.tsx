import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
      <Hero
        page="lab-equipment"
        title={item.name}
        description={item.category ? `Category: ${item.category}` : "Professional Laboratory Equipment"}
      />

      <AnimatedContentWrapper>
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 bg-white min-h-screen">
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/lab-equipment" className="hover:text-green-600">Lab Equipment</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">{item.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-4">
              <Image
                src={item.image_url || "/image2.png"}
                alt={item.name}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="space-y-8">
              <div>
                {item.category && (
                  <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold mb-4">
                    {item.category}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Equipment Overview</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-600/20"
                >
                  Request Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContentWrapper>
    </div>
  );
}
