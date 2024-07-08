import { connectDB } from "@/config/mongoose/connect-dv";
import { UserProfile } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("r");
  const userId = searchParams.get("u");

  if (clerkId === "") {
    return NextResponse.json({
      error: "No clerkId provided",
      status: 400,
      type: "warning",
    });
  }
  try {
    await connectDB();
    const userProfile = await UserProfile.findOne({ owner: userId });

    console.log(userProfile);
    if (userProfile?.ownerClerkId !== clerkId) {
      return NextResponse.json({
        message: "User profile not found , Contact Admin",
        status: 404,
        type: "error",
      });
    }
    return NextResponse.json({
      message: "User profile found",
      data: userProfile,
      status: 200,
      type: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
      type: "error",
    });
  }
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("r");
  const userId = searchParams.get("u");

  if (clerkId === "") {
    return NextResponse.json({
      error: "No clerkId provided",
      status: 400,
      type: "warning",
    });
  }

  try {
    await connectDB();
    const userProfile = await UserProfile.findOne({ owner: userId });
    if (userProfile.ownerClerkId !== clerkId) {
      return NextResponse.json({
        message: "User profile not found , Contact Admin",
        status: 404,
        type: "error",
      });
    }
    const data = await req.json();
    const updatedUserProfile = await UserProfile.findOneAndUpdate(
      { owner: userId },
      data,
      { new: true }
    );
    return NextResponse.json({
      message: "User profile updated",
      data: updatedUserProfile,
      status: 200,
      type: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
      type: "error",
    });
  }
}
