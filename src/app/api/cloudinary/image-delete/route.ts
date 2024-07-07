import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const data = await req.json();
  const { publicId } = data;
  console.log(data);
  try {
    await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({
      message: "Deleted Success Fully",
      status: 200,
      type: "success",
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
      type: "success",
    });
  }
}
