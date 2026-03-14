import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Question from "@/lib/models/Question";
import { papers, questionsData } from "@/lib/questions-data";

export async function GET(req: NextRequest) {
  const paperId = req.nextUrl.searchParams.get("paperId");

  const paper = papers.find((p) => p.id === paperId);
  const selectedQuestions = paper ? paper.questions : questionsData;

  try {
    const db = await dbConnect();

    if (db && !paperId) {
      const questions = await Question.find({})
        .select("-correctOption")
        .sort({ questionNo: 1 })
        .lean();
      if (questions.length > 0) {
        return NextResponse.json(questions);
      }
    }

    const fallback = selectedQuestions.map((q, i) => ({
      _id: `${paperId || "default"}_${i}`,
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
    const fallback = selectedQuestions.map((q, i) => ({
      _id: `${paperId || "default"}_${i}`,
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
