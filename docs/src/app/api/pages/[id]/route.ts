import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, slug, content, meta_title, meta_description, is_active } = data;
    
    // Validate required fields
    if (!id || !title || !slug) {
      return NextResponse.json(
        { success: false, message: 'ID, title, and slug are required' },
        { status: 400 }
      );
    }
    
    // Return dummy response for now
    const updatedPage = {
      id: parseInt(id),
      title,
      slug,
      content: content || '',
      meta_title: meta_title || '',
      meta_description: meta_description || '',
      is_active: is_active !== undefined ? is_active : true,
      updated_at: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      page: updatedPage,
      message: 'Page updated successfully (demo mode)'
    });
  } catch (error) {
    console.error('Failed to update page:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update page' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: 'Valid page ID is required' },
        { status: 400 }
      );
    }
    
    // Return dummy response for now
    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully (demo mode)'
    });
  } catch (error) {
    console.error('Failed to delete page:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete page' },
      { status: 500 }
    );
  }
}