import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const farmer = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        farmerProfile: true,
      },
    });
    return NextResponse.json(farmer);
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

export async function DELETE(request, { params: { id } }) {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    const deletedUser = await db.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Delete User",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request,{params:{id}}) {
  // Recieve the data
  try {
    const { emailVerified } =
      await request.json();
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `Not Found`
        },
        { status: 404 }
      );
    }
    const updateUser = await db.user.update({
      where: { id },
      data: {  emailVerified },
    });
    return NextResponse.json(updateUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to update User",
        error,
      },
      { status: 500 }
    );
  }
}
