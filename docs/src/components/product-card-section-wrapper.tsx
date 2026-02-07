import { dbService } from "@/lib/db-service";
import { ProductCardSection } from "./product-card-section";

export async function ProductCardSectionWrapper() {
  try {
    // Fetch products and solutions from the database
    const [products, solutions] = await Promise.all([
      dbService.getProducts(undefined, 4), // Get up to 4 featured products
      dbService.getSolutions()
    ]);

    // Transform products and solutions into card data
    const productCards = products.map(product => ({
      id: product.id,
      image: product.image_url || '/placeholder-product.jpg',
      title: product.name,
      description: product.description.length > 150 
        ? `${product.description.substring(0, 150)}...` 
        : product.description,
      detailedContent: product.description,
      type: 'product' as const
    }));

    const solutionCards = solutions.map(solution => ({
      id: solution.id,
      image: solution.image_url || '/placeholder-solution.jpg',
      title: solution.title,
      description: solution.summary || solution.description.substring(0, 150) + '...',
      detailedContent: solution.description,
      type: 'solution' as const
    }));

    // Combine and limit to 4 items
    const allCards = [...productCards, ...solutionCards].slice(0, 4);

    return <ProductCardSection initialCards={allCards} />;
  } catch (error) {
    console.error('Error fetching products and solutions:', error);
    // Return a fallback UI or empty state
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Products & Solutions</h2>
          <p className="text-gray-600">Unable to load products at the moment. Please try again later.</p>
        </div>
      </section>
    );
  }
}
