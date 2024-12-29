

import db from "@/lib/db";
import { CaseSensitive } from "lucide-react";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      barcode,
      categoryId,
      farmerId,
      isWholesale,
      productCode,
      productPrice,
      salePrice,
      slug,
      sku,
      title,
      description,
      isActive,
      tags,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
      productImages
    } = await req.json();

    const parsedWholesaleQty = parseInt(wholesaleQty) || 0;
    const parsedProductStock = parseInt(productStock) || 0;
    const parsedQty = parseInt(qty) || 0;

    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: `Product (${title}) already exists`,
        },
        { status: 409 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        barcode,
        productCode,
        productPrice: parseFloat(productPrice),
        salePrice: parseFloat(salePrice),
        slug,
        sku,
        title,
        description,
        productImages,
        imageUrl:productImages[0],
        isActive,
        tags,
        unit,
        isWholesale,
        wholesalePrice: parseFloat(wholesalePrice),
        wholesaleQty: parsedWholesaleQty,
        productStock: parsedProductStock,
        qty: parsedQty,
        category: {
          connect: {
            id: categoryId,
          },
        },
        user: {
          connect: {
            id: farmerId,
          },
        },
      },
    });

    return NextResponse.json(
      { data: newProduct, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error.message);
    return NextResponse.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const categoryId = request.nextUrl.searchParams.get("catId")
  const sortBy = request.nextUrl.searchParams.get("sort")
  const min = request.nextUrl.searchParams.get("min")
  const max = request.nextUrl.searchParams.get("max")
  const searchTerm = request.nextUrl.searchParams.get("search")
  console.log(sortBy,categoryId)
  let where={
    categoryId
  }
  if(min && max){
    where.salePrice={
      gte: parseFloat(min),
      lte: parseFloat(max)
    }
  }else if(min){
    where.salePrice={
      gte: parseFloat(min)
    };
  }else if(max){
    where.salePrice={
      lte: parseFloat(max)
    };
  }
  let products;
  try {
    if(searchTerm){
      products= await db.product.findMany({
        where:{
          OR:[
            {title:{contains: searchTerm , mode:"insensitive"}}, {description:{contains: searchTerm , mode:"insensitive"}}
          ]
        }
      })

    }else
    if(categoryId && sortBy){
    products = await db.product.findMany({
      where,
        orderBy: {
          salePrice: sortBy === "asc" ? "asc" : "desc"
        },
      });
    }else if(categoryId){
      products = await db.product.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        
      });
    }else {
       products = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        
      });
    }
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch product",
        error,
      },
      { status: 500 }
    );
  }
}
