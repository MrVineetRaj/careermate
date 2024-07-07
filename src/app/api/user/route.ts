"use server";

import { connectDB } from "@/config/mongoose/connect-dv";
import { User } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const clerkId = searchParams.get("r") || "";
  const userName = searchParams.get("n") || "";

  console.log("Here", clerkId, userName);
  if (userName !== "") {
    try {
      await connectDB();
      const user = await User.findOne({ userName });

      if (!user) {
        return NextResponse.json({
          message: "User not found",
          status: 404,
          type: "error",
        });
      }
      return NextResponse.json({
        message: "User found",
        data: user,
        status: 200,
        type: "success",
      });
    } catch (error: any) {
      return NextResponse.json({
        message: "user not found",
        status: 500,
        type: "error",
      });
    }
  } else if (clerkId === "") {
    return NextResponse.json({
      message: "No clerkId provided",
      status: 400,
      type: "error",
    });
  }

  try {
    await connectDB();
    const user = await User.findOne({ clerkId });
    return NextResponse.json({
      message: "User found",
      data: user,
      status: 200,
      type: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      type: "error",
    });
  }
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("r");
  if (!clerkId) {
    return NextResponse.json({
      error: "No clerkId provided",
      status: 400,
      type: "error",
    });
  }

  const data = await req.json();
  try {
    await connectDB();
    const user = await User.findOneAndUpdate({ clerkId }, data, {
      new: true,
    });
    return NextResponse.json({
      message: "User updated",
      data: user,
      status: 200,
      type: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      type: "error",
    });
  }
}
