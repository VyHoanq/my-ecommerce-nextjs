import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Lấy dữ liệu từ body của request
    const { title, couponCode, expiryDate, isActive, discountValue, vendorId } = await request.json();

    // Định dạng lại ngày hết hạn
    const formattedExpiryDate = new Date(expiryDate);

    // Tạo mã giảm giá mới trong cơ sở dữ liệu
    const newCoupon = await db.coupon.create({
      data: {
        title,
        couponCode,
        expiryDate: formattedExpiryDate,
        isActive,
        discountValue, // Giá trị giảm giá, cần thêm vào schema nếu chưa có
        vendorId,
      },
    });

    return NextResponse.json(newCoupon);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to create Coupon",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Lấy danh sách các mã giảm giá
    const coupons = await db.coupon.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(coupons);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch Coupons",
        error,
      },
      { status: 500 }
    );
  }
}
export async function PATCH(request) {
  try {
    const { couponCode } = await request.json();

    // Tìm mã giảm giá dựa trên couponCode
    const coupon = await db.coupon.findUnique({
      where: { couponCode },
    });

    if (!coupon) {
      return NextResponse.json(
        { message: "Coupon not found or invalid" },
        { status: 404 }
      );
    }

    // Kiểm tra ngày hết hạn
    const currentDate = new Date();
    if (new Date(coupon.expiryDate) < currentDate) {
      return NextResponse.json(
        { message: "Coupon expired" },
        { status: 400 }
      );
    }

    // Kiểm tra trạng thái hoạt động
    if (!coupon.isActive) {
      return NextResponse.json(
        { message: "Coupon is inactive" },
        { status: 400 }
      );
    }

    // Giảm giá mặc định là $5
    const discountValue = 5;

    // Trả về thông báo áp dụng thành công và số tiền giảm giá
    return NextResponse.json({
      message: "Coupon applied successfully",
      discountValue, // Giảm giá cố định là $5
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to apply coupon",
        error,
      },
      { status: 500 }
    );
  }
}
