import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Return dummy data for now
    const dummyPages = [
      {
        id: 1,
        title: "About Us",
        slug: "about",
        content: "Learn more about our company and mission...",
        meta_title: "About ION Green Energy Storage Systems",
        meta_description: "Discover our commitment to sustainable energy solutions",
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: "Contact Us",
        slug: "contact",
        content: "Get in touch with our team...",
        meta_title: "Contact ION Green - Energy Storage Solutions",
        meta_description: "Reach out to our experts for energy storage solutions",
        is_active: true,
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: "Support",
        slug: "support",
        content: "Find resources and support materials...",
        meta_title: "ION Green Support Center",
        meta_description: "Access documentation and support for our products",
        is_active: true,
        created_at: new Date().toISOString()
      }
    ];
    
    // Create response with cache control headers to prevent caching
    const response = NextResponse.json({
      success: true,
      pages: dummyPages
    });
    
    // Add cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, slug, content, meta_title, meta_description, is_active = true } = data;
    
    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: 'Title and slug are required' },
        { status: 400 }
      );
    }
    
    // Return dummy response for now
    const newPage = {
      id: Date.now(), // Use timestamp as ID for demo purposes
      title,
      slug,
      content: content || '',
      meta_title: meta_title || '',
      meta_description: meta_description || '',
      is_active: is_active !== undefined ? is_active : true,
      created_at: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      page: newPage,
      message: 'Page created successfully (demo mode)'
    });
  } catch (error) {
    console.error('Failed to create page:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create page' },
      { status: 500 }
    );
  }
}