import { SectionHeading } from "@/components/section-heading";
import Image from "next/image";
import { dbService } from "@/lib/db-service";

interface LabEquipment {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

// Fallback images for lab equipment
const fallbackLabImages = [
  "/lab1.jpg",
  "/lab2.jpg",
  "/lab3.jpg",
  "/lab4.jpg",
  "/lab5.jpg",
  "/lab6.jpg",
  "/lab7.jpg",
  "/lab8.jpg"
];

export async function DynamicLabEquipmentSection() {
  let equipmentItems: LabEquipment[] = [];
  
  try {
    // Fetch lab equipment from database
    equipmentItems = await dbService.getLabEquipment();
  } catch (error) {
    console.error("Failed to fetch lab equipment:", error);
    // If there's an error, we'll show an empty array which will render a message
  }

  // If no equipment found, show a message
  if (equipmentItems.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Lab Equipment"
            title="State-of-the-Art Laboratory Equipment"
            description="ION Green utilizes cutting-edge testing equipment to ensure the highest quality and performance standards for our energy storage products."
          />
          
          <div className="mt-16 text-center py-12">
            <p className="text-lg text-gray-600">No lab equipment available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Lab Equipment"
          title="State-of-the-Art Laboratory Equipment"
          description="ION Green utilizes cutting-edge testing equipment to ensure the highest quality and performance standards for our energy storage products."
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" suppressHydrationWarning>
          {equipmentItems.slice(0, 4).map((item, index) => (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-56 w-full relative overflow-hidden">
                <Image
                  src={item.image_url || fallbackLabImages[index % fallbackLabImages.length]}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.name}</h3>
                <p className="text-gray-600 line-clamp-2 h-14">{item.description}</p>
                <div className="mt-6 flex gap-3">
                  <a 
                    href={`/lab-equipment/${item.slug}`} 
                    className="flex-1 inline-flex items-center justify-center text-green-600 font-medium hover:text-green-700 transition-colors border border-green-600 rounded-md py-2"
                  >
                    Learn more
                  </a>
                  <a 
                    href="tel:+919202836627"
                    className="flex-1 inline-flex items-center justify-center text-white font-medium bg-green-600 hover:bg-green-700 transition-colors rounded-md py-2"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a 
            href="/lab-equipment" 
            className="px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
}
