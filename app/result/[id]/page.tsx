"use client";

import { useEffect, useState, use, useMemo, Fragment } from "react";
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

interface OptionData {
  label: string;
  text: string;
}

interface DetailedAnswer {
  questionNo: number;
  selectedOption: string | null;
  timeTakenSec: number;
  correctOption: string;
  questionText: string;
  options: OptionData[];
  part: string;
  partName: string;
  passage?: string;
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

function renderRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <span key={i} className="font-bold text-blue-700 bg-blue-50 px-1 rounded">
          {inner}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type QuestionFilter = "all" | "wrong" | "unanswered" | "correct";

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "detailed">("overview");
  const [expandedQ, setExpandedQ] = useState<Set<number>>(new Set());
  const [questionFilter, setQuestionFilter] = useState<QuestionFilter>("all");

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

  const toggleExpand = (qNo: number) => {
    setExpandedQ((prev) => {
      const next = new Set(prev);
      if (next.has(qNo)) next.delete(qNo);
      else next.add(qNo);
      return next;
    });
  };

  const expandAll = () => {
    if (!data) return;
    const filtered = getFilteredAnswers();
    setExpandedQ(new Set(filtered.map((a) => a.questionNo)));
  };

  const collapseAll = () => setExpandedQ(new Set());

  const getFilteredAnswers = useMemo(() => {
    if (!data) return () => [];
    return () => {
      if (questionFilter === "all") return data.detailedAnswers;
      return data.detailedAnswers.filter((a) => a.status === questionFilter);
    };
  }, [data, questionFilter]);

  const sectionInsights = useMemo(() => {
    if (!data) return null;
    const { sectionBreakdown, detailedAnswers } = data;

    const sectionAnalysis = sectionBreakdown.map((s) => {
      const sectionAnswers = detailedAnswers.filter((a) => a.part === s.part);
      const attempted = s.correct + s.wrong;
      const accuracy = attempted > 0 ? (s.correct / attempted) * 100 : 0;
      const avgTime =
        sectionAnswers.length > 0
          ? sectionAnswers.reduce((sum, a) => sum + a.timeTakenSec, 0) / sectionAnswers.length
          : 0;
      const wrongQuestions = sectionAnswers.filter((a) => a.status === "wrong");
      const skippedQuestions = sectionAnswers.filter((a) => a.status === "unanswered");

      let performanceLevel: "excellent" | "good" | "average" | "needs-improvement";
      if (accuracy >= 85 && attempted >= s.total * 0.7)
        performanceLevel = "excellent";
      else if (accuracy >= 65 && attempted >= s.total * 0.5)
        performanceLevel = "good";
      else if (accuracy >= 45)
        performanceLevel = "average";
      else performanceLevel = "needs-improvement";

      return {
        ...s,
        accuracy,
        avgTime,
        wrongCount: wrongQuestions.length,
        skippedCount: skippedQuestions.length,
        attempted,
        performanceLevel,
      };
    });

    const weakestSection = [...sectionAnalysis].sort(
      (a, b) => a.accuracy - b.accuracy
    )[0];
    const strongestSection = [...sectionAnalysis].sort(
      (a, b) => b.accuracy - a.accuracy
    )[0];

    const totalAttempted = data.attempt.correct + data.attempt.wrong;
    const overallAccuracy =
      totalAttempted > 0 ? (data.attempt.correct / totalAttempted) * 100 : 0;

    let overallGrade: string;
    let gradeColor: string;
    if (overallAccuracy >= 85) {
      overallGrade = "Excellent";
      gradeColor = "text-green-600";
    } else if (overallAccuracy >= 70) {
      overallGrade = "Good";
      gradeColor = "text-blue-600";
    } else if (overallAccuracy >= 50) {
      overallGrade = "Average";
      gradeColor = "text-yellow-600";
    } else {
      overallGrade = "Needs Improvement";
      gradeColor = "text-red-600";
    }

    const recommendations: string[] = [];

    if (data.attempt.unanswered > 20)
      recommendations.push(
        `You skipped ${data.attempt.unanswered} questions. Try attempting more — even educated guesses can boost your score.`
      );
    if (data.attempt.wrong > data.attempt.correct)
      recommendations.push(
        "Your wrong answers exceed correct ones. Focus on accuracy over speed — negative marking is hurting your score."
      );

    sectionAnalysis.forEach((s) => {
      if (s.accuracy < 50 && s.attempted > 0)
        recommendations.push(
          `${s.partName}: Only ${s.accuracy.toFixed(0)}% accuracy. This section needs dedicated practice.`
        );
      if (s.skippedCount > s.total * 0.5)
        recommendations.push(
          `${s.partName}: ${s.skippedCount} out of ${s.total} questions skipped. Improve speed or topic knowledge here.`
        );
    });

    const avgTimePerQ =
      detailedAnswers.length > 0
        ? detailedAnswers.reduce((s, a) => s + a.timeTakenSec, 0) / detailedAnswers.length
        : 0;
    if (avgTimePerQ > 50)
      recommendations.push(
        `Average time per question is ${avgTimePerQ.toFixed(0)}s (target: ~36s). Practice timed mock tests to build speed.`
      );

    const negativeMarks = data.attempt.wrong * 0.5;
    if (negativeMarks > 10)
      recommendations.push(
        `You lost ${negativeMarks.toFixed(1)} marks to negative marking. Be more selective — skip unsure questions.`
      );

    return {
      sectionAnalysis,
      weakestSection,
      strongestSection,
      overallGrade,
      gradeColor,
      overallAccuracy,
      recommendations,
      negativeMarks,
      avgTimePerQ,
    };
  }, [data]);

  if (loading || !data || !sectionInsights) {
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

  const timeBuckets = { "0–30s": 0, "30–60s": 0, "60–120s": 0, "120s+": 0 };
  detailedAnswers.forEach((a) => {
    if (a.timeTakenSec <= 30) timeBuckets["0–30s"]++;
    else if (a.timeTakenSec <= 60) timeBuckets["30–60s"]++;
    else if (a.timeTakenSec <= 120) timeBuckets["60–120s"]++;
    else timeBuckets["120s+"]++;
  });

  const sortedByTime = [...detailedAnswers]
    .filter((a) => a.timeTakenSec > 0)
    .sort((a, b) => b.timeTakenSec - a.timeTakenSec);
  const slowest5 = sortedByTime.slice(0, 5);

  const filteredAnswers = getFilteredAnswers();

  const performanceLevelConfig = {
    excellent: { label: "Excellent", bg: "bg-green-100", text: "text-green-800", bar: "bg-green-500" },
    good: { label: "Good", bg: "bg-blue-100", text: "text-blue-800", bar: "bg-blue-500" },
    average: { label: "Average", bg: "bg-yellow-100", text: "text-yellow-800", bar: "bg-yellow-500" },
    "needs-improvement": { label: "Weak", bg: "bg-red-100", text: "text-red-800", bar: "bg-red-500" },
  };

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
        {/* Overall Grade Banner */}
        <Card className="border-2 border-gray-200">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Overall Performance</p>
                <p className={`text-4xl font-bold ${sectionInsights.gradeColor}`}>
                  {sectionInsights.overallGrade}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Accuracy: {sectionInsights.overallAccuracy.toFixed(1)}% | Score: {attempt.score}/200
                </p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-green-600">{attempt.correct}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">{attempt.wrong}</p>
                  <p className="text-xs text-muted-foreground">Wrong</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-400">{attempt.unanswered}</p>
                  <p className="text-xs text-muted-foreground">Skipped</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Cards */}
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
                  <p className="font-bold text-lg">{sectionInsights.avgTimePerQ.toFixed(1)}s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section-wise Performance with Accuracy Bars */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Section-wise Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sectionInsights.sectionAnalysis.map((s) => {
              const config = performanceLevelConfig[s.performanceLevel];
              return (
                <div key={s.part} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="font-semibold">Part {s.part}: {s.partName}</span>
                    </div>
                    <Badge className={`${config.bg} ${config.text} hover:${config.bg}`}>
                      {config.label}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center text-sm">
                    <div>
                      <p className="text-lg font-bold">{s.total}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{s.correct}</p>
                      <p className="text-xs text-muted-foreground">Correct</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-red-600">{s.wrong}</p>
                      <p className="text-xs text-muted-foreground">Wrong</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-400">{s.skippedCount}</p>
                      <p className="text-xs text-muted-foreground">Skipped</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{s.score}/{s.total * 2}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Accuracy: {s.accuracy.toFixed(1)}%</span>
                      <span>Avg Time: {s.avgTime.toFixed(1)}s/question</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all ${config.bar}`}
                        style={{ width: `${Math.min(s.accuracy, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-700">Strongest Section</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">{sectionInsights.strongestSection.partName}</p>
              <p className="text-sm text-muted-foreground">
                {sectionInsights.strongestSection.accuracy.toFixed(1)}% accuracy
                ({sectionInsights.strongestSection.correct}/{sectionInsights.strongestSection.attempted} attempted correct)
              </p>
              <p className="text-sm text-green-600 mt-1">Keep up the good work here!</p>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-red-700">Weakest Section</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">{sectionInsights.weakestSection.partName}</p>
              <p className="text-sm text-muted-foreground">
                {sectionInsights.weakestSection.accuracy.toFixed(1)}% accuracy
                ({sectionInsights.weakestSection.correct}/{sectionInsights.weakestSection.attempted} attempted correct)
              </p>
              <p className="text-sm text-red-600 mt-1">Focus more practice on this section.</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        {sectionInsights.recommendations.length > 0 && (
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-800">Practice Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sectionInsights.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                    <span className="mt-0.5 shrink-0">💡</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Negative Marking Impact */}
        {sectionInsights.negativeMarks > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Score Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-green-600">+{attempt.correct * 2}</p>
                  <p className="text-xs text-muted-foreground">Marks gained from correct answers</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-red-600">−{sectionInsights.negativeMarks.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Marks lost to negative marking</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-blue-600">{attempt.score}</p>
                  <p className="text-xs text-muted-foreground">Final net score</p>
                </div>
              </div>
              {attempt.wrong > 0 && (
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  If you had skipped the {attempt.wrong} wrong answers instead, your score would have been{" "}
                  <span className="font-bold">{(attempt.correct * 2).toFixed(0)}</span> (
                  {attempt.correct * 2 > attempt.score ? (
                    <span className="text-green-600">+{(attempt.correct * 2 - attempt.score).toFixed(1)} more</span>
                  ) : (
                    "same"
                  )}
                  ).
                </p>
              )}
            </CardContent>
          </Card>
        )}

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
            Question-wise Review
          </Button>
        </div>

        {activeTab === "overview" && (
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
        )}

        {activeTab === "detailed" && (
          <div className="space-y-4">
            {/* Filter and controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { key: "all", label: "All", count: detailedAnswers.length },
                    { key: "wrong", label: "Wrong", count: detailedAnswers.filter((a) => a.status === "wrong").length },
                    { key: "unanswered", label: "Skipped", count: detailedAnswers.filter((a) => a.status === "unanswered").length },
                    { key: "correct", label: "Correct", count: detailedAnswers.filter((a) => a.status === "correct").length },
                  ] as const
                ).map((f) => (
                  <Button
                    key={f.key}
                    variant={questionFilter === f.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setQuestionFilter(f.key)}
                    className="cursor-pointer"
                  >
                    {f.label} ({f.count})
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={expandAll} className="cursor-pointer text-xs">
                  Expand All
                </Button>
                <Button variant="ghost" size="sm" onClick={collapseAll} className="cursor-pointer text-xs">
                  Collapse All
                </Button>
              </div>
            </div>

            {filteredAnswers.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No questions match this filter.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredAnswers.map((a) => {
                  const isExpanded = expandedQ.has(a.questionNo);
                  return (
                    <Card
                      key={a.questionNo}
                      className={`transition-all ${
                        a.status === "correct"
                          ? "border-l-4 border-l-green-500"
                          : a.status === "wrong"
                          ? "border-l-4 border-l-red-500"
                          : "border-l-4 border-l-gray-300"
                      }`}
                    >
                      {/* Collapsed header - always visible */}
                      <button
                        className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50/50 transition-colors"
                        onClick={() => toggleExpand(a.questionNo)}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono font-bold text-sm shrink-0">
                            Q.{a.questionNo}
                          </span>
                          <Badge className="shrink-0 text-xs bg-gray-100 text-gray-600 hover:bg-gray-100">
                            Part {a.part}
                          </Badge>
                          {a.status === "correct" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 shrink-0">
                              Correct
                            </Badge>
                          ) : a.status === "wrong" ? (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 shrink-0">
                              Wrong
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 shrink-0">
                              Skipped
                            </Badge>
                          )}
                          {a.status === "wrong" && (
                            <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                              You chose: {a.selectedOption} | Correct: {a.correctOption}
                            </span>
                          )}
                          {a.status === "unanswered" && (
                            <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                              Correct was: {a.correctOption}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground">{a.timeTakenSec.toFixed(0)}s</span>
                          <span className="text-gray-400">{isExpanded ? "▲" : "▼"}</span>
                        </div>
                      </button>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-3 border-t">
                          {/* Passage if exists */}
                          {a.passage && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm leading-relaxed mt-3 max-h-48 overflow-y-auto">
                              <p className="font-semibold text-amber-800 mb-1 text-xs">Passage:</p>
                              <p className="text-gray-700 whitespace-pre-line text-xs">{a.passage}</p>
                            </div>
                          )}

                          {/* Question text */}
                          <div className="mt-3">
                            <p className="text-sm leading-relaxed whitespace-pre-line">
                              {renderRichText(a.questionText)}
                            </p>
                          </div>

                          {/* Options */}
                          {a.options && a.options.length > 0 && (
                            <div className="space-y-2 mt-2">
                              {a.options.map((opt) => {
                                const isCorrectOpt = opt.label === a.correctOption;
                                const isSelectedOpt = opt.label === a.selectedOption;
                                const isWrongSelection = isSelectedOpt && !isCorrectOpt;

                                let optionStyle =
                                  "border-gray-200 bg-white text-gray-700";
                                if (isCorrectOpt)
                                  optionStyle =
                                    "border-green-500 bg-green-50 text-green-900";
                                if (isWrongSelection)
                                  optionStyle =
                                    "border-red-500 bg-red-50 text-red-900";

                                return (
                                  <div
                                    key={opt.label}
                                    className={`flex items-start gap-3 p-3 rounded-lg border-2 ${optionStyle}`}
                                  >
                                    <span
                                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${
                                        isCorrectOpt
                                          ? "bg-green-500 text-white"
                                          : isWrongSelection
                                          ? "bg-red-500 text-white"
                                          : "bg-gray-200 text-gray-600"
                                      }`}
                                    >
                                      {isCorrectOpt ? "✓" : isWrongSelection ? "✗" : opt.label}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-sm">
                                        {renderRichText(opt.text)}
                                      </span>
                                      {isCorrectOpt && (
                                        <span className="ml-2 text-xs font-semibold text-green-700">
                                          ← Correct Answer
                                        </span>
                                      )}
                                      {isWrongSelection && (
                                        <span className="ml-2 text-xs font-semibold text-red-700">
                                          ← Your Answer
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Quick explanation for wrong/unanswered */}
                          {a.status === "wrong" && a.options && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                              <p className="font-semibold text-red-800 text-xs mb-1">Result:</p>
                              <p className="text-red-700 text-xs">
                                You selected option <strong>{a.selectedOption}</strong> (
                                {a.options.find((o) => o.label === a.selectedOption)?.text || "—"}
                                ) but the correct answer is option <strong>{a.correctOption}</strong> (
                                {a.options.find((o) => o.label === a.correctOption)?.text || "—"}).
                                <span className="text-red-500 ml-1">−0.5 marks</span>
                              </p>
                            </div>
                          )}
                          {a.status === "unanswered" && a.options && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
                              <p className="font-semibold text-gray-700 text-xs mb-1">Result:</p>
                              <p className="text-gray-600 text-xs">
                                You skipped this question. The correct answer was option{" "}
                                <strong>{a.correctOption}</strong> (
                                {a.options.find((o) => o.label === a.correctOption)?.text || "—"}).
                                <span className="text-gray-500 ml-1">0 marks</span>
                              </p>
                            </div>
                          )}
                          {a.status === "correct" && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                              <p className="text-green-700 text-xs">
                                You got this right! <span className="text-green-600 font-semibold">+2 marks</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
