import Image from "next/image";
import { getSiteContent } from "@/lib/content";

const products = getSiteContent().products;

// Use local hero-style images for all product cards
const productImages = [
  "/data1.jpg.jpg",
  "/data2.jpg.jpg",
  "/data3.jpg.jpg",
  "/data4.jpg.jpg",
  "/data5.jpp.jpg",
];

export function ProductShowcase() {
  return (
    <section id="products" className="bg-gradient-to-br from-white to-green-50 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product, index) => (
            <article
              key={product.title}
              className="flex flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={productImages[index % productImages.length]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}