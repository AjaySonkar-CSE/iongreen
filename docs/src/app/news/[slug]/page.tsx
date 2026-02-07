import { notFound } from "next/navigation";
import Image from "next/image";
import { dbService } from "@/lib/db-service";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

// Fallback data for hardcoded news items on the homepage
const FALLBACK_NEWS_ITEMS: Record<string, any> = {
  "balcony-photovoltaic-energy-storage": {
    title: "Balcony Photovoltaic Energy Storage",
    summary: "Smart solution for urban homes with solar panels.",
    content: "<p>Balcony energy storage systems are becoming increasingly popular in urban environments. These compact systems allow apartment dwellers to generate and store their own renewable energy, reducing reliance on the grid and lowering electricity bills. Our solution integrates seamlessly with standard balcony solar panels, providing a plug-and-play experience that requires no professional installation.</p><p>Key features include:</p><ul><li>Compact design fits on any balcony</li><li>Easy installation and setup</li><li>Smart app monitoring for real-time energy tracking</li><li>High-efficiency lithium-ion battery technology</li></ul>",
    image_url: "/new1.jpg",
    publish_date: "2025-03-24",
    created_at: new Date("2025-03-24"),
  },
  "swimming-pool-heat-pumps-hotels": {
    title: "Swimming Pool Heat Pumps",
    summary: "Benefits for hotels and resorts.",
    content: "<p>Commercial swimming pools require significant energy to maintain comfortable temperatures. Our advanced heat pump technology offers a sustainable and cost-effective solution for hotels and resorts. By utilizing ambient air heat, our pumps deliver superior efficiency compared to traditional gas or electric heaters.</p><p>Benefits for your business:</p><ul><li>Up to 75% energy savings</li><li>Extended swimming season</li><li>Low operating noise</li><li>Durable, corrosion-resistant construction</li></ul>",
    image_url: "/new2.jpg",
    publish_date: "2025-03-19",
    created_at: new Date("2025-03-19"),
  },
  "ess-ev-charging-stations": {
    title: "ESS in EV Charging Stations",
    summary: "Supporting the growing EV network.",
    content: "<p>As the electric vehicle market expands, the demand for fast and reliable charging infrastructure grows. Integrating Energy Storage Systems (ESS) with EV charging stations is a game-changer. It helps manage peak loads, avoids grid upgrades, and allows for the integration of renewable energy sources.</p><p>Our ESS solutions for EV charging offer:</p><ul><li>Peak shaving to reduce demand charges</li><li>Grid stability support</li><li>Backup power functionality</li><li>Optimized charging for multiple vehicles</li></ul>",
    image_url: "/new3.jpg",
    publish_date: "2025-02-28",
    created_at: new Date("2025-02-28"),
  },
  "solar-panel-technology": {
    title: "Latest Solar Panel Technology",
    summary: "New advancements in solar panel efficiency.",
    content: "<p>The solar industry is constantly evolving, and we are at the forefront of these changes. Our latest solar panel technology achieves record-breaking efficiency levels, capturing more sunlight and converting it into usable energy than ever before.</p><p>Technological highlights:</p><ul><li>N-type TOPCon cell technology</li><li>Bifacial modules for enhanced energy generation</li><li>Superior performance in low-light conditions</li><li>Extended lifespan and durability</li></ul>",
    image_url: "/new4.jpg",
    publish_date: "2025-04-10",
    created_at: new Date("2025-04-10"),
  },
  "energy-storage-solutions": {
    title: "Energy Storage Solutions",
    summary: "Innovative approaches to energy storage.",
    content: "<p>Energy storage is the key to unlocking the full potential of renewable energy. Our comprehensive range of storage solutions covers everything from residential applications to large-scale utility projects.</p><p>We provide:</p><ul><li>Modular battery systems for scalability</li><li>Advanced Battery Management Systems (BMS) for safety</li><li>Integration with smart grid technologies</li><li>Long-term warranty and support</li></ul>",
    image_url: "/new5.jpg",
    publish_date: "2025-04-15",
    created_at: new Date("2025-04-15"),
  }
};

export default async function NewsDetailPage(props: NewsPageProps) {
  const { slug } = await props.params;

  let item = await dbService.getNewsBySlug(slug);

  // Fallback if not found in DB
  if (!item && FALLBACK_NEWS_ITEMS[slug]) {
    item = FALLBACK_NEWS_ITEMS[slug];
  }

  if (!item) {
    notFound();
  }

  const publishLabel = item.publish_date;
  const createdAt = new Date(item.created_at).toLocaleDateString();

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 w-full">
        <Image
          src={item.image_url || "/1/ion1.png"}
          alt={item.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{item.title}</h1>
            <div className="flex justify-center space-x-4 text-sm md:text-base opacity-90">
              {publishLabel && <p>Publish Date: {publishLabel}</p>}
              <p>Created: {createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {item.summary && (
          <p className="text-lg text-slate-700 mb-6">{item.summary}</p>
        )}
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: item.content || "" }} />
        </div>
      </div>
    </div>
  );
}