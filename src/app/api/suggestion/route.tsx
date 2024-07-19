"use server";
import { Suggestion } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/mongoose/connect-dv";

export async function POST(req: Request) {
  const data = await req.json();
  const { idea, userId, clerkId, source } = data;
  try {
    await connectDB();
    const newSuggestion = new Suggestion({
      owner: userId,
      clerkId: clerkId,
      source: source,
      newSuggestion: {
        newSkills: idea.newSkills,
        freeResources: idea.freeResources,
        projectIdea: idea.projectIdea,
        description: idea.description,
        roadMap: idea.roadMap,
      },
    });
    await newSuggestion.save();
    return NextResponse.json({
      message: "new suggestion added",
      status: 200,
      data: newSuggestion,
      type: "success",
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      message: "Something went wrong contact developer or try again later",
      status: 400,
      type: "error",
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("u") || "";
  const suggestionId = searchParams.get("s") || "";

  if (suggestionId) {
    try {
      await connectDB();
      const suggestion = await Suggestion.findById(suggestionId);
      return NextResponse.json({
        message: "suggestion fetched ",
        status: 200,
        data: suggestion,
        type: "success",
      });
    } catch (error: any) {
      console.log(error.message);
      return NextResponse.json({
        message: "Something went wrong contact developer or try again later",
        status: 400,
        type: "error",
      });
    }
  }

  try {
    await connectDB();
    console.log(userId);
    const suggestions = await Suggestion.find({ clerkId: userId }).sort({
      _id: -1,
    });
    return NextResponse.json({
      message: "suggestions fetched",
      status: 200,
      data: suggestions,
      type: "success",
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      message: "Something went wrong contact developer or try again later",
      status: 400,
      type: "error",
    });
  }
}
