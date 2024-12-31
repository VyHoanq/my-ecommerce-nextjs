import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const createEmailHtml = (name, redirectUrl, linkText, description, subject) => `
  <div style="max-width: 480px; margin: 0 auto; padding: 20px;">
    <h2>${subject}</h2>
    <div style="padding: 24px; border: 1px solid #dedede; border-radius: 5px;">
      <p>Hey <strong>${name}</strong>!</p>
      <p>${description}</p>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/${redirectUrl}" 
         style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
        ${linkText}
      </a>
    </div>
  </div>
`;

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();
    console.log('Received registration request for:', email, 'with role:', role);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: `User with email ${email} already exists` },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        verificationToken: token,
      },
    });

    if (role === "FARMER") {
      try {
        console.log('Preparing to send verification email to:', email);
        const userId = newUser.id;
        const linkText = "Verify Account";
        const redirectUrl = `onboarding/${userId}?token=${token}`;
        const description = "Thank you for Creating an Account with Us. Please click on the link Below to Complete your onboarding Process.";
        const subject = "Account Verification - Zunz Ecommerce";

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject,
          html: createEmailHtml(name, redirectUrl, linkText, description, subject)
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully to:', email);
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
      }
    }

    return NextResponse.json({
      data: newUser,
      message: "User created successfully"
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: "Failed to create user", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Fetch Users",
        error,
      },
      { status: 500 }
    );
  }
}
