import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey: string = String(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req: Request) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const data = await req.json();
  const { prompt } = data;
  console.log(prompt);

  try {
    const result = await chatSession.sendMessage(prompt);

    let finalResult = result.response.text();

    let startPos = finalResult.indexOf("```json") + "```json".length;
    let endPos = finalResult.indexOf("```", startPos);

    let jsonString = finalResult.substring(startPos, endPos).trim();

    jsonString = jsonString.replaceAll("```json", "");
    jsonString = jsonString.replaceAll("```", "");
    jsonString = jsonString.replaceAll("*", "");
    jsonString = jsonString.replaceAll("#", "");
    jsonString = jsonString.replaceAll("\n", "");

    console.log(JSON.parse(jsonString));

    return NextResponse.json({
      status: 200,
      message: "Resume Generated Successfully",
      type: "success",
      data: jsonString,
    });
  } catch (e: any) {
    return NextResponse.json({
      status: 500,
      message: e.message,
      type: "error",
    });
  }
}
