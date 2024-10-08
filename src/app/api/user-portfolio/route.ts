import { connectDB } from "@/config/mongoose/connect-dv";
import { UserPortfolio } from "@/config/mongoose/schemas";
import { User } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { owner, ownerClerkId, userPortfolio } = data;

  try {
    await connectDB();
    const newUserPortfolio = new UserPortfolio({
      owner,
      ownerClerkId,
      portfolio: userPortfolio,
    });
    await newUserPortfolio.save();
    return NextResponse.json({
      status: 200,
      message: "Portfolio Saved Successfully",
      data: newUserPortfolio,
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

  const userId = searchParams.get("u");
  const shared = searchParams.get("s");
  const clerkId = searchParams.get("c");

  try {
    await connectDB();

    const user = await User.findById(userId);
    const userPortfolio = await UserPortfolio.findOne({ owner: userId });

    if (!userPortfolio) {
      return NextResponse.json({
        message: "Portfolio not found",
        status: 404,
        type: "error",
      });
    }

    if (clerkId === user.clerkId) {
      return NextResponse.json({
        message: "Portfolio found",
        data: userPortfolio,
        status: 200,
        type: "success",
      });
    }

    console.log("\n\n",user.profileType, shared, userPortfolio._id,"\n\n");

    if (user.profileType === "Private" && shared != userPortfolio._id) {
      return NextResponse.json({
        message: "Portfolio is private",
        status: 401,
        type: "error",
      });
    }

    return NextResponse.json({
      message: "Portfolio found",
      data: userPortfolio,
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
