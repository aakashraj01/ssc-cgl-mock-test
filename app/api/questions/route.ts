import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Question from "@/lib/models/Question";

export async function GET() {
  try {
    await dbConnect();
    const questions = await Question.find({})
      .select("-correctOption")
      .sort({ questionNo: 1 })
      .lean();
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Fetch questions error:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
