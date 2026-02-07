
"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { ProductForm } from "@/components/admin/product-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [unwrappedParams.id]);

  async function fetchProduct() {
    try {
      const res = await fetch(`/api/products/${unwrappedParams.id}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.data);
      } else {
        toast.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return <ProductForm productId={Number(unwrappedParams.id)} initialData={product} />;
}
