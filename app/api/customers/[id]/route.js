// app/api/customers/[id]/route.js
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const userId = params.id;

    // Fetch the user and include their profile information
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the user basic info
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: data.name || existingUser.name,
        email: data.email || existingUser.email,
      },
    });

    // Update or create the user profile
    const profileData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      profileImage: data.profileImageUrl,
    };

    const updatedProfile = await db.userProfile.upsert({
      where: {
        userId: userId,
      },
      update: profileData,
      create: {
        ...profileData,
        userId: userId,
      },
    });

    return NextResponse.json({
      user: updatedUser,
      profile: updatedProfile,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch user", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const userId = params.id;

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete user (this will cascade delete the profile due to the onDelete: Cascade in schema)
    const deletedUser = await db.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        message: "Failed to delete user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
