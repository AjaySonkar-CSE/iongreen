import { NewsFeed } from "@/components/news-feed";
import { ScrollAnimate } from "@/components/scroll-animate";
import { dbService } from "@/lib/db-service";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeroSlider } from "@/components/page-hero-slider";

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
  
  // Hero slider slides for news page
  const heroSlides = [
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

  return (
    <>
      {/* Hero Section with Slider */}
      <PageHeroSlider 
        slides={heroSlides}
        height="h-[80vh]"
        showNavigation={true}
        showIndicators={true}
        autoPlay={true}
        autoPlayInterval={5000}
      />
      <ScrollAnimate animation="fadeInUpElegant" delay={400}>
        <div id="news-feed">
          <NewsFeed news={news} />
        </div>
      </ScrollAnimate>
    </>
  );
}