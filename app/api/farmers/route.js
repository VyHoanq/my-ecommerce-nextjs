import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const farmerData = await request.json();
    const existingUser = await db.user.findUnique({
      where: {
        id: farmerData.userId.farmerId || farmerData.userId
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `No User Found`,
        },
        { status: 404 }
      );
    }
    const updateUser = await db.user.update({
      where: {
        id: farmerData.userId.farmerId || farmerData.userId
      },
      data:{
        emailVerified:true
      }
    })
    const newFarmerProfile = await db.farmerProfile.create({
      data: {
        code: farmerData.code,
        contactPerson: farmerData.contactPerson,
        profileImageUrl: farmerData.profileImageUrl,
        lastName: farmerData.lastName,
        firstName: farmerData.firstName,
        phone: farmerData.phone,
        physicalAddress: farmerData.physicalAddress,
        terms: farmerData.terms,
        products: farmerData.products,
        userId: farmerData.userId.farmerId || farmerData.userId,
      },
    });
    console.log("Created Farmer Profile:", newFarmerProfile);
    return NextResponse.json(newFarmerProfile);
  } catch (error) {
    console.error("Error creating farmer profile:", error.message);
    return NextResponse.json(
      { message: "Failed to create farmers", error: error.message },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const farmers = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where:{
        role:"FARMER"
      },
      include:{
        farmerProfile:true
      }
    });
    return NextResponse.json(farmers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Farmers",
        error,
      },
      { status: 500 }
    );
  }
}