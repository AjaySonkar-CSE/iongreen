import { notFound } from 'next/navigation';
import { getDbPool } from '@/lib/db';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pool = getDbPool();

  try {
    // Fetch the page from the database
    const [rows] = await pool.query(
      'SELECT * FROM pages WHERE slug = ? AND is_active = 1',
      [resolvedParams.slug]
    );

    const page = (rows as any[])[0];

    if (!page) {
      return notFound();
    }

    // Set page metadata
    const seoTitle = page.seo_title || page.title;
    const seoDescription = page.seo_description || '';
    const seoKeywords = page.seo_keywords ? page.seo_keywords.split(',').map((k: string) => k.trim()) : [];

    return (
      <>
        <head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          {seoKeywords.length > 0 && (
            <meta name="keywords" content={seoKeywords.join(', ')} />
          )}

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDescription} />
        </head>

        <main className="container mx-auto py-12 px-4">
          <article className="prose lg:prose-xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </article>
        </main>
      </>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    return notFound();
  }
}

// Generate static params for better performance
export async function generateStaticParams() {
  const pool = getDbPool();
  const [rows] = await pool.query('SELECT slug FROM pages WHERE is_active = 1');

  return (rows as any[]).map((page) => ({
    slug: page.slug,
  }));
}
