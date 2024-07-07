import { connectDB } from "@/config/mongoose/connect-dv";
import { UserResume } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { owner, ownerClerkId, userResume } = data;

  try {
    await connectDB();
    const newUserResume = new UserResume({
      owner,
      ownerClerkId,
      resume: userResume,
    });
    await newUserResume.save();
    return NextResponse.json({
      status: 200,
      message: "Resume Saved Successfully",
      data: newUserResume,
      type: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
      type: "error",
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resumeId = searchParams.get("r");
  const userId = searchParams.get("u");

  if (resumeId === "") {
    return NextResponse.json({
      error: "No resumeId provided",
      status: 400,
      type: "warning",
    });
  }

  try {
    await connectDB();
    const userResume = await UserResume.findOne({ owner: userId , _id: resumeId});
    
    return NextResponse.json({
      message: "Resume found",
      data: userResume,
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
