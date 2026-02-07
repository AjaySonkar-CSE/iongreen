import { NewsFeed } from "@/components/news-feed";
import { ScrollAnimate } from "@/components/scroll-animate";
import { dbService } from "@/lib/db-service";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NewsPage() {
  // Fetch news data on the server side
  const dbNews = await dbService.getNews(6);

  // Transform database news to match NewsItem interface
  const news = dbNews.map(item => ({
    title: item.title,
    date: item.publish_date,
    summary: item.summary,
    image: item.image_url
  }));
  
  return (
    <>
      {/* Hero Section - Professional News Showcase */}
      <section className="relative bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  Company News
                  <span className="text-green-400 block">& Events</span>
                </h1>
              </ScrollAnimate>

              <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Stay current with exhibitions, product launches, and strategic partnerships. 
                  Get the latest updates on ION Green innovations and industry developments.
                </p>
              </ScrollAnimate>

              <ScrollAnimate animation="scaleInBounce" delay={600}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                  >
                    <Link href="#news-feed">
                      View News
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold"
                  >
                    <Link href="/contact">
                      Subscribe
                    </Link>
                  </Button>
                </div>
              </ScrollAnimate>
            </div>

            <div className="relative">
              <ScrollAnimate animation="slideInRightSmooth" delay={300}>
                <div className="relative h-96 lg:h-[500px]">
                  <Image
                    src="/1/ion1.png"
                    alt="ION Green News & Events"
                    fill
                    className="object-contain rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>
      <ScrollAnimate animation="fadeInUpElegant" delay={400}>
        <div id="news-feed">
          <NewsFeed news={news} />
        </div>
      </ScrollAnimate>
    </>
  );
}