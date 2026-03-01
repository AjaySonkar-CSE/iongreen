import { NewsFeed } from "@/components/news-feed";
import { ScrollAnimate } from "@/components/scroll-animate";
import { dbService } from "@/lib/db-service";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeroSlider } from "@/components/page-hero-slider";

import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

export const revalidate = 60;

export default async function NewsPage() {
  // Fetch up to 100 active news items on the server side instead of strictly 6
  const dbNews = await dbService.getNews(100);

  // Transform database news to match NewsItem interface
  const news = dbNews.map(item => ({
    title: item.title,
    date: item.publish_date,
    summary: item.summary,
    content: item.content,
    image: item.image_url
  }));

  // Fetch hero slides from DB
  const dbSlides = await dbService.getHeroSlidesByPage("news");

  // Default fallback slides
  const fallbackSlides = [
    {
      id: 1,
      title: "Company News & Events",
      description: "Stay informed with the latest news, events, product launches, and industry insights. Get updates on ION Green innovations, exhibitions, and strategic partnerships.",
      ctaLabel: "View News",
      ctaHref: "#news-feed",
      image: "/Img/image4.png"
    },
    {
      id: 2,
      title: "Latest Updates & Announcements",
      description: "Discover our latest product launches, industry exhibitions, strategic partnerships, and technological innovations in energy storage solutions.",
      ctaLabel: "Read More",
      ctaHref: "#news-feed",
      image: "/Img/image5.png"
    },
    {
      id: 3,
      title: "Industry Insights & Trends",
      description: "Stay ahead with expert analysis, market trends, and insights into the evolving energy storage industry and renewable energy technologies.",
      ctaLabel: "Subscribe",
      ctaHref: "/contact",
      image: "/Img/image6.png"
    }
  ];

  // Use DB slides if available, otherwise fallback
  const heroSlides = dbSlides.length > 0
    ? dbSlides.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description || "",
      ctaLabel: s.cta_label || "",
      ctaHref: s.cta_href || "",
      image: s.image_url
    }))
    : fallbackSlides;

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Slider - Fixed like home page */}
      <PageHeroSlider
        slides={heroSlides}
        height="h-screen"
        showNavigation={true}
        showIndicators={true}
        autoPlay={true}
        autoPlayInterval={5000}
        fixed={true}
      />

      <AnimatedContentWrapper>

        <ScrollAnimate animation="fadeInUpElegant" delay={400}>
          <div id="news-feed">
            <NewsFeed news={news} />
          </div>
        </ScrollAnimate>
      </AnimatedContentWrapper>
    </div>
  );
}