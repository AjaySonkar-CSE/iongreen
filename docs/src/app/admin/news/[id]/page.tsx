
"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { NewsForm } from "@/components/admin/news-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [unwrappedParams.id]);

  async function fetchNews() {
    try {
      const res = await fetch(`/api/news/${unwrappedParams.id}`);
      const data = await res.json();
      if (data.success) {
        setNews(data.data);
      } else {
        toast.error("Failed to fetch news article");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load news article");
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

  if (!news) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500">
        News article not found
      </div>
    );
  }

  return <NewsForm newsId={Number(unwrappedParams.id)} initialData={news} />;
}
