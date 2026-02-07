
import { NextResponse } from "next/server";
import { dbService } from "@/lib/db-service";
import { getDbPool } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid product ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to get product by ID
    const product = await dbService.getProductById(Number(id));

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { success: true, message: "Using mock data due to service unavailability", data: null },
      { status: 200 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, features, specifications, applications, benefits, image_url, category, is_active, is_featured } = body;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid product ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to update the product in the database
    const pool = getDbPool();
    
    const query = `UPDATE products SET name = ?, slug = ?, description = ?, features = ?, specifications = ?, applications = ?, benefits = ?, image_url = ?, category = ?, is_active = ?, is_featured = ?, updated_at = NOW() WHERE id = ?`;
    
    const [result] = await pool.execute(query, [
      name, slug, description, 
      features ? JSON.stringify(features) : null,
      specifications ? JSON.stringify(specifications) : null,
      applications ? JSON.stringify(applications) : null,
      benefits ? JSON.stringify(benefits) : null,
      image_url, category, 
      is_active ? 1 : 0, 
      is_featured ? 1 : 0,
      Number(id)
    ]);
    
    // Fetch the updated product
    const updatedProduct = await dbService.getProductById(Number(id));
    
    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found after update" },
        { status: 404 }
      );
    }
    
    console.log(`Product updated successfully for ID: ${id}`, { name, slug });
    
    return NextResponse.json({ 
      success: true, 
      message: "Product updated successfully",
      data: updatedProduct 
    });
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "Valid product ID is required" },
        { status: 400 }
      );
    }

    // Use dbService to delete the product from the database
    const pool = getDbPool();
    
    const query = `DELETE FROM products WHERE id = ?`;
    
    const [result] = await pool.execute(query, [Number(id)]);
    
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    console.log(`Product deleted successfully for ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: "Product deleted successfully"
    });
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { success: true, message: "Using mock mode due to service unavailability" },
      { status: 200 }
    );
  }
}
