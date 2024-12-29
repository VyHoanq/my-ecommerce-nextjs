import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Fetch Product",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 404 }
      );
    }
    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Delete Product",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, {params:{id}}) {
  try {
    const data = await request.json();
    
    // Chỉ lấy các trường hợp lệ và chuyển đổi kiểu dữ liệu
    const formattedData = {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl,
      description: data.description,
      isActive: data.isActive,
      isWholesale: data.isWholesale,
      sku: data.sku,
      barcode: data.barcode,
      productCode: data.productCode,
      unit: data.unit,
      productPrice: parseFloat(data.productPrice),
      salePrice: parseFloat(data.salePrice),
      wholesalePrice: data.wholesalePrice ? parseFloat(data.wholesalePrice) : null,
      wholesaleQty: data.wholesaleQty ? parseInt(data.wholesaleQty) : null,
      productStock: data.productStock ? parseInt(data.productStock) : null,
      qty: data.qty ? parseInt(data.qty) : null,
      tags: data.tags,
      categoryId: data.categoryId,
      userId: data.userId
    };

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { data: null, message: `Not Found` },
        { status: 404 }
      );
    }

    const updateProduct = await db.product.update({
      where: { id },
      data: formattedData,
    });

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update Product", error },
      { status: 500 }
    );
  }
}