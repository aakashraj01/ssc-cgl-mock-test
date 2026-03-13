import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Question from "@/lib/models/Question";
import Attempt from "@/lib/models/Attempt";

interface SubmitAnswer {
  questionNo: number;
  selectedOption: string | null;
  timeTakenSec: number;
}

interface SubmitBody {
  playerName: string;
  startedAt: string;
  finishedAt: string;
  totalTimeSec: number;
  answers: SubmitAnswer[];
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body: SubmitBody = await req.json();
    const { playerName, startedAt, finishedAt, totalTimeSec, answers } = body;

    if (!playerName || !answers || answers.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const questions = await Question.find({}).lean();
    const answerMap = new Map(
      questions.map((q) => [q.questionNo, q.correctOption])
    );

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    for (const ans of answers) {
      if (!ans.selectedOption) {
        unanswered++;
      } else if (ans.selectedOption === answerMap.get(ans.questionNo)) {
        correct++;
      } else {
        wrong++;
      }
    }

    const score = correct * 2 - wrong * 0.5;

    const attempt = await Attempt.create({
      playerName,
      startedAt: new Date(startedAt),
      finishedAt: new Date(finishedAt),
      totalTimeSec,
      answers,
      score,
      correct,
      wrong,
      unanswered,
    });

    return NextResponse.json({ success: true, attemptId: attempt._id, score, correct, wrong, unanswered });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
