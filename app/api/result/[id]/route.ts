import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Question from "@/lib/models/Question";
import Attempt from "@/lib/models/Attempt";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const attempt = await Attempt.findById(id).lean();
    if (!attempt) {
      return NextResponse.json({ error: "Attempt not found" }, { status: 404 });
    }

    const questions = await Question.find({}).sort({ questionNo: 1 }).lean();

    const questionsMap = new Map(
      questions.map((q) => [
        q.questionNo,
        {
          questionNo: q.questionNo,
          part: q.part,
          partName: q.partName,
          questionText: q.questionText,
          options: q.options,
          correctOption: q.correctOption,
          passage: q.passage,
        },
      ])
    );

    const detailedAnswers = attempt.answers.map((ans: { questionNo: number; selectedOption: string | null; timeTakenSec: number }) => {
      const q = questionsMap.get(ans.questionNo);
      let status: "correct" | "wrong" | "unanswered" = "unanswered";
      if (ans.selectedOption) {
        status = ans.selectedOption === q?.correctOption ? "correct" : "wrong";
      }
      return {
        ...ans,
        correctOption: q?.correctOption,
        questionText: q?.questionText,
        options: q?.options,
        part: q?.part,
        partName: q?.partName,
        passage: q?.passage,
        status,
      };
    });

    const parts = ["A", "B", "C", "D"];
    const sectionBreakdown = parts.map((p) => {
      const sectionAnswers = detailedAnswers.filter((a: { part: string }) => a.part === p);
      const partName =
        sectionAnswers[0]?.partName ||
        { A: "General Intelligence and Reasoning", B: "General Awareness", C: "Quantitative Aptitude", D: "English Comprehension" }[p];
      return {
        part: p,
        partName,
        total: sectionAnswers.length,
        correct: sectionAnswers.filter((a: { status: string }) => a.status === "correct").length,
        wrong: sectionAnswers.filter((a: { status: string }) => a.status === "wrong").length,
        unanswered: sectionAnswers.filter((a: { status: string }) => a.status === "unanswered").length,
        score:
          sectionAnswers.filter((a: { status: string }) => a.status === "correct").length * 2 -
          sectionAnswers.filter((a: { status: string }) => a.status === "wrong").length * 0.5,
      };
    });

    return NextResponse.json({
      attempt: {
        playerName: attempt.playerName,
        startedAt: attempt.startedAt,
        finishedAt: attempt.finishedAt,
        totalTimeSec: attempt.totalTimeSec,
        score: attempt.score,
        correct: attempt.correct,
        wrong: attempt.wrong,
        unanswered: attempt.unanswered,
      },
      detailedAnswers,
      sectionBreakdown,
    });
  } catch (error) {
    console.error("Result error:", error);
    return NextResponse.json({ error: "Failed to fetch result" }, { status: 500 });
  }
}
