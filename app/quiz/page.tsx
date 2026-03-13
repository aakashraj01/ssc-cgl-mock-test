"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import QuestionPalette from "@/components/QuestionPalette";
import QuestionDisplay from "@/components/QuestionDisplay";

interface Option {
  label: string;
  text: string;
}

interface Question {
  _id: string;
  questionNo: number;
  part: string;
  partName: string;
  questionText: string;
  options: Option[];
  passage?: string;
}

const TOTAL_TIME = 60 * 60; // 60 minutes

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [markedForReview, setMarkedForReview] = useState<boolean[]>([]);
  const [timeTaken, setTimeTaken] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const questionEntryTime = useRef(Date.now());
  const hasSubmitted = useRef(false);

  useEffect(() => {
    const name = sessionStorage.getItem("playerName");
    if (!name) {
      router.replace("/");
      return;
    }

    const saved = sessionStorage.getItem("quizState");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setQuestions(state.questions);
        setAnswers(state.answers);
        setMarkedForReview(state.markedForReview);
        setTimeTaken(state.timeTaken);
        setStartTime(state.startTime);
        setCurrentIndex(state.currentIndex);
        questionEntryTime.current = Date.now();
        setLoading(false);
        return;
      } catch {
        sessionStorage.removeItem("quizState");
      }
    }

    fetch("/api/questions")
      .then((res) => res.json())
      .then((data: Question[]) => {
        if (!data || data.length === 0) {
          alert("No questions found. Please seed the database first via POST /api/seed");
          router.replace("/");
          return;
        }
        const now = Date.now();
        setQuestions(data);
        setAnswers(new Array(data.length).fill(null));
        setMarkedForReview(new Array(data.length).fill(false));
        setTimeTaken(new Array(data.length).fill(0));
        setStartTime(now);
        questionEntryTime.current = now;
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load questions");
        router.replace("/");
      });
  }, [router]);

  // Persist state to sessionStorage on changes
  useEffect(() => {
    if (questions.length === 0) return;
    sessionStorage.setItem(
      "quizState",
      JSON.stringify({
        questions,
        answers,
        markedForReview,
        timeTaken,
        startTime,
        currentIndex,
      })
    );
  }, [questions, answers, markedForReview, timeTaken, startTime, currentIndex]);

  const recordTimeForCurrent = useCallback(() => {
    const now = Date.now();
    const delta = (now - questionEntryTime.current) / 1000;
    setTimeTaken((prev) => {
      const updated = [...prev];
      updated[currentIndex] = (updated[currentIndex] || 0) + delta;
      return updated;
    });
    questionEntryTime.current = now;
  }, [currentIndex]);

  const goToQuestion = useCallback(
    (index: number) => {
      recordTimeForCurrent();
      setCurrentIndex(index);
    },
    [recordTimeForCurrent]
  );

  const handleSelectOption = (label: string) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = label;
      return updated;
    });
  };

  const handleClear = () => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = null;
      return updated;
    });
  };

  const handleMarkReview = () => {
    setMarkedForReview((prev) => {
      const updated = [...prev];
      updated[currentIndex] = !updated[currentIndex];
      return updated;
    });
  };

  const handleSubmit = useCallback(async () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    setSubmitting(true);

    recordTimeForCurrent();

    const playerName = sessionStorage.getItem("playerName") || "Anonymous";
    const now = new Date();
    const totalTimeSec = Math.floor((Date.now() - startTime) / 1000);

    const payload = {
      playerName,
      startedAt: new Date(startTime).toISOString(),
      finishedAt: now.toISOString(),
      totalTimeSec: Math.min(totalTimeSec, TOTAL_TIME),
      answers: questions.map((q, i) => ({
        questionNo: q.questionNo,
        selectedOption: answers[i],
        timeTakenSec: Math.round((timeTaken[i] || 0) * 100) / 100,
      })),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.attemptId) {
        sessionStorage.removeItem("quizState");
        router.push(`/result/${data.attemptId}`);
      } else {
        alert("Submission failed. Please try again.");
        hasSubmitted.current = false;
        setSubmitting(false);
      }
    } catch {
      alert("Network error. Please try again.");
      hasSubmitted.current = false;
      setSubmitting(false);
    }
  }, [answers, questions, recordTimeForCurrent, router, startTime, timeTaken]);

  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const confirmSubmit = () => {
    const unanswered = answers.filter((a) => a === null).length;
    const msg =
      unanswered > 0
        ? `You have ${unanswered} unanswered question(s). Are you sure you want to submit?`
        : "Are you sure you want to submit the exam?";
    if (window.confirm(msg)) {
      handleSubmit();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg hidden sm:block">SSC CGL Mock Test</h1>
          <span className="text-sm text-muted-foreground">
            {answeredCount}/{questions.length} answered
          </span>
        </div>
        <div className="flex items-center gap-3">
          {startTime > 0 && (
            <Timer totalSeconds={TOTAL_TIME} onTimeUp={handleTimeUp} startTime={startTime} />
          )}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden cursor-pointer"
            onClick={() => setShowPalette(!showPalette)}
          >
            Palette
          </Button>
          <Button
            onClick={confirmSubmit}
            disabled={submitting}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            {submitting ? "Submitting..." : "Submit Exam"}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Question area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-3xl mx-auto">
            {currentQuestion && (
              <QuestionDisplay
                question={currentQuestion}
                selectedOption={answers[currentIndex]}
                onSelect={handleSelectOption}
              />
            )}

            {/* Navigation */}
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={!answers[currentIndex]}
                className="cursor-pointer"
              >
                Clear Response
              </Button>
              <Button
                variant={markedForReview[currentIndex] ? "default" : "outline"}
                onClick={handleMarkReview}
                className={`cursor-pointer ${markedForReview[currentIndex] ? "bg-purple-500 hover:bg-purple-600" : ""}`}
              >
                {markedForReview[currentIndex] ? "Unmark Review" : "Mark for Review"}
              </Button>
              <div className="flex-1" />
              <Button
                variant="outline"
                onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="cursor-pointer"
              >
                ← Previous
              </Button>
              <Button
                onClick={() =>
                  goToQuestion(Math.min(questions.length - 1, currentIndex + 1))
                }
                disabled={currentIndex === questions.length - 1}
                className="cursor-pointer"
              >
                Next →
              </Button>
            </div>
          </div>
        </main>

        {/* Desktop palette */}
        <aside className="hidden lg:block w-64 border-l bg-white overflow-y-auto p-4">
          <h2 className="font-semibold mb-3 text-sm text-gray-700">Question Palette</h2>
          <QuestionPalette
            total={questions.length}
            currentIndex={currentIndex}
            answers={answers}
            markedForReview={markedForReview}
            onSelect={goToQuestion}
          />
        </aside>

        {/* Mobile palette overlay */}
        {showPalette && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowPalette(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-sm text-gray-700">
                  Question Palette
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPalette(false)}
                  className="cursor-pointer"
                >
                  ✕
                </Button>
              </div>
              <QuestionPalette
                total={questions.length}
                currentIndex={currentIndex}
                answers={answers}
                markedForReview={markedForReview}
                onSelect={(i) => {
                  goToQuestion(i);
                  setShowPalette(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
