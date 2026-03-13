"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DetailedAnswer {
  questionNo: number;
  selectedOption: string | null;
  timeTakenSec: number;
  correctOption: string;
  questionText: string;
  part: string;
  partName: string;
  status: "correct" | "wrong" | "unanswered";
}

interface SectionBreakdown {
  part: string;
  partName: string;
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  score: number;
}

interface AttemptData {
  playerName: string;
  startedAt: string;
  finishedAt: string;
  totalTimeSec: number;
  score: number;
  correct: number;
  wrong: number;
  unanswered: number;
}

interface ResultData {
  attempt: AttemptData;
  detailedAnswers: DetailedAnswer[];
  sectionBreakdown: SectionBreakdown[];
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "detailed">("overview");

  useEffect(() => {
    fetch(`/api/result/${id}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.error) {
          alert("Result not found");
          router.replace("/");
          return;
        }
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load result");
        router.replace("/");
      });
  }, [id, router]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const { attempt, detailedAnswers, sectionBreakdown } = data;
  const percentage = ((attempt.score / 200) * 100).toFixed(1);
  const accuracy =
    attempt.correct + attempt.wrong > 0
      ? ((attempt.correct / (attempt.correct + attempt.wrong)) * 100).toFixed(1)
      : "0";

  const totalTimeUsed = attempt.totalTimeSec;
  const avgTimePerQ =
    detailedAnswers.length > 0
      ? detailedAnswers.reduce((s, a) => s + a.timeTakenSec, 0) / detailedAnswers.length
      : 0;

  const sortedByTime = [...detailedAnswers]
    .filter((a) => a.timeTakenSec > 0)
    .sort((a, b) => b.timeTakenSec - a.timeTakenSec);
  const slowest5 = sortedByTime.slice(0, 5);

  const timeBuckets = { "0–30s": 0, "30–60s": 0, "60–120s": 0, "120s+": 0 };
  detailedAnswers.forEach((a) => {
    if (a.timeTakenSec <= 30) timeBuckets["0–30s"]++;
    else if (a.timeTakenSec <= 60) timeBuckets["30–60s"]++;
    else if (a.timeTakenSec <= 120) timeBuckets["60–120s"]++;
    else timeBuckets["120s+"]++;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm px-4 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">Exam Results</h1>
            <p className="text-sm text-muted-foreground">{attempt.playerName}</p>
          </div>
          <Button onClick={() => router.push("/")} variant="outline" className="cursor-pointer">
            Take Another Test
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Score Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="pt-6">
              <p className="text-blue-100 text-sm">Score</p>
              <p className="text-3xl font-bold">{attempt.score}/200</p>
              <p className="text-blue-200 text-sm">{percentage}%</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="pt-6">
              <p className="text-green-100 text-sm">Correct</p>
              <p className="text-3xl font-bold">{attempt.correct}</p>
              <p className="text-green-200 text-sm">+{attempt.correct * 2} marks</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardContent className="pt-6">
              <p className="text-red-100 text-sm">Wrong</p>
              <p className="text-3xl font-bold">{attempt.wrong}</p>
              <p className="text-red-200 text-sm">−{(attempt.wrong * 0.5).toFixed(1)} marks</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-500 to-gray-600 text-white border-0">
            <CardContent className="pt-6">
              <p className="text-gray-200 text-sm">Unanswered</p>
              <p className="text-3xl font-bold">{attempt.unanswered}</p>
              <p className="text-gray-300 text-sm">0 marks</p>
            </CardContent>
          </Card>
        </div>

        {/* Accuracy & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Accuracy</span>
                  <span className="font-bold">{accuracy}%</span>
                </div>
                <Progress value={parseFloat(accuracy)} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Attempted: {attempt.correct + attempt.wrong}/100</span>
                  <span>Net Score: {attempt.score}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-muted-foreground">Total Time</p>
                  <p className="font-bold text-lg">{formatTime(totalTimeUsed)}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-muted-foreground">Avg/Question</p>
                  <p className="font-bold text-lg">{avgTimePerQ.toFixed(1)}s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Section-wise Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Section</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center text-green-700">Correct</TableHead>
                    <TableHead className="text-center text-red-700">Wrong</TableHead>
                    <TableHead className="text-center text-gray-500">Skipped</TableHead>
                    <TableHead className="text-center font-bold">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectionBreakdown.map((s) => (
                    <TableRow key={s.part}>
                      <TableCell>
                        <span className="font-medium">Part {s.part}</span>
                        <br />
                        <span className="text-xs text-muted-foreground">{s.partName}</span>
                      </TableCell>
                      <TableCell className="text-center">{s.total}</TableCell>
                      <TableCell className="text-center text-green-700 font-semibold">{s.correct}</TableCell>
                      <TableCell className="text-center text-red-700 font-semibold">{s.wrong}</TableCell>
                      <TableCell className="text-center text-gray-500">{s.unanswered}</TableCell>
                      <TableCell className="text-center font-bold">{s.score}/{s.total * 2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(timeBuckets).map(([bucket, count]) => (
                <div key={bucket} className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground">questions in {bucket}</p>
                </div>
              ))}
            </div>
            {slowest5.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">Top 5 Slowest Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {slowest5.map((a) => (
                    <Badge key={a.questionNo} variant="outline" className="text-sm">
                      Q.{a.questionNo}: {a.timeTakenSec.toFixed(0)}s
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tab switcher */}
        <div className="flex gap-2 border-b pb-2">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("overview")}
            className="cursor-pointer"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "detailed" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("detailed")}
            className="cursor-pointer"
          >
            Question-wise Details
          </Button>
        </div>

        {activeTab === "detailed" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Question-wise Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Q#</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead className="text-center">Your Answer</TableHead>
                      <TableHead className="text-center">Correct Answer</TableHead>
                      <TableHead className="text-center">Time</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailedAnswers.map((a) => (
                      <TableRow
                        key={a.questionNo}
                        className={
                          a.status === "correct"
                            ? "bg-green-50/50"
                            : a.status === "wrong"
                            ? "bg-red-50/50"
                            : "bg-gray-50/50"
                        }
                      >
                        <TableCell className="font-mono font-bold">{a.questionNo}</TableCell>
                        <TableCell>
                          <span className="text-xs">Part {a.part}</span>
                        </TableCell>
                        <TableCell className="text-center font-mono">
                          {a.selectedOption || "—"}
                        </TableCell>
                        <TableCell className="text-center font-mono font-bold text-green-700">
                          {a.correctOption}
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {a.timeTakenSec.toFixed(0)}s
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              a.status === "correct"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : a.status === "wrong"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                            }
                          >
                            {a.status === "correct"
                              ? "✓ Correct"
                              : a.status === "wrong"
                              ? "✗ Wrong"
                              : "— Skipped"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
