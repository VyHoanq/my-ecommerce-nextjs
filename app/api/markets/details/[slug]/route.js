import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request,{params:{slug}}) {
    try {
      const market = await db.market.findUnique({
       where: {
          slug
        },
      });
      return NextResponse.json(market);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Failed to Fetch Market",
          error,
        },
        { status: 500 }
      );
    }
  }


  // export async function PUT(request,{params:{id}}) {
  //   // Recieve the data
  //   try {
  //     const {title, slug, logoUrl, description,isActive ,categoryIds } =
  //       await request.json();
  //     const existingMarket= await db.market.findUnique({
  //       where: {
  //         id,
  //       },
  //     });
  //     if (!existingMarket) {
  //       return NextResponse.json(
  //         {
  //           data: null,
  //           message: `Not Found`
  //         },
  //         { status: 404 }
  //       );
  //     }
  //     const updateMarket = await db.market.update({
  //       where: { id },
  //       data: { title, slug, logoUrl, description,isActive ,categoryIds  },
  //     });
  //     return NextResponse.json(updateMarket);
  //   } catch (error) {
  //     console.log(error);
  //     return NextResponse.json(
  //       {
  //         message: "Failed to update Market",
  //         error,
  //       },
  //       { status: 500 }
  //     );
  //   }
  // }