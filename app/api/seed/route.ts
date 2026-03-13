import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Question from "@/lib/models/Question";
import { questionsData } from "@/lib/questions-data";

export async function POST() {
  try {
    await dbConnect();
    await Question.deleteMany({});
    await Question.insertMany(questionsData);
    return NextResponse.json({ success: true, count: questionsData.length });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
