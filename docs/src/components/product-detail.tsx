import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface ProductDetailProps {
  title: string;
  description: string;
  range: string;
  features: string[];
  image: string;
  specifications: {
    label: string;
    value: string;
  }[];
  applications: string[];
}

export function ProductDetail({
  title,
  description,
  range,
  features,
  image,
  specifications,
  applications,
}: ProductDetailProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-lg text-gray-600">{range}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-6">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 mb-6">{description}</p>
            
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <div className="space-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">{spec.label}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Applications</h2>
            <ul className="space-y-2">
              {applications.map((app, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2"></span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Request More Information</h3>
            <p className="text-gray-600 mb-4">
              Interested in learning more about our {title}? Contact our sales team for detailed specifications and pricing.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Related products will be mapped here */}
        </div>
      </div>
    </div>
  );
}
