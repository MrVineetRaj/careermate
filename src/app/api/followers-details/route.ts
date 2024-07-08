import { FollowersDetails } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const data = await req.json();
  const { email, userId, userName, imageUrl, ownerId } = data;

  try {
    const followersDetails = await FollowersDetails.findOne({
      owner: ownerId,
    });

    const tempFollowers = followersDetails.followers.filter(
      (follower: any) => follower.userId !== userId
    );

    if (tempFollowers.length === followersDetails.followers.length) {
      followersDetails.followers.push({
        email,
        userId,
        userName,
        imageUrl,
      });

      await followersDetails.save();
      return NextResponse.json({
        message: "followed user successfully",
        status: 200,
        type: "success",
      });
    } else {
      followersDetails.followers = tempFollowers;
      await followersDetails.save();
      return NextResponse.json({
        message: "unfollowed user successfully",
        status: 200,
        type: "success",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
      type: "error",
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("u");
  
  console.log(userId);
  try {
    const followersDetails = await FollowersDetails.findOne({
      owner: userId,
    });
    
    return NextResponse.json({
      data: followersDetails,
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
