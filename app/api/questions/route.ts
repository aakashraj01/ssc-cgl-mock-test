import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Question from "@/lib/models/Question";
import { questionsData } from "@/lib/questions-data";

export async function GET() {
  try {
    const db = await dbConnect();

    if (db) {
      const questions = await Question.find({})
        .select("-correctOption")
        .sort({ questionNo: 1 })
        .lean();
      if (questions.length > 0) {
        return NextResponse.json(questions);
      }
    }

    const fallback = questionsData.map((q, i) => ({
      _id: `local_${i}`,
      questionNo: q.questionNo,
      part: q.part,
      partName: q.partName,
      questionText: q.questionText,
      options: q.options,
      passage: q.passage,
    }));
    return NextResponse.json(fallback);
  } catch (error) {
    console.error("Fetch questions error:", error);
    const fallback = questionsData.map((q, i) => ({
      _id: `local_${i}`,
      questionNo: q.questionNo,
      part: q.part,
      partName: q.partName,
      questionText: q.questionText,
      options: q.options,
      passage: q.passage,
    }));
    return NextResponse.json(fallback);
  }
}
