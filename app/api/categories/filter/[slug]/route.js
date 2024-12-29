import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request,{params:{slug}}) {
  console.log("wekmewkewkcwekwemkcwe",request)
    try {
      const category = await db.category.findUnique({
       where: {
          slug
        },
        include:{
          products:true,
        }
      });
      return NextResponse.json(category);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Failed to Fetch Category",
          error,
        },
        { status: 500 }
      );
    }
  }


