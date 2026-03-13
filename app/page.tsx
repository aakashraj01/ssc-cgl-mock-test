"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    if (!name.trim()) return;
    setLoading(true);
    sessionStorage.setItem("playerName", name.trim());
    router.push("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            SSC CGL Mock Test
          </h1>
          <p className="text-lg text-muted-foreground">
            Computer Based Test Simulator — Tier 1
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">Exam Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold text-blue-700">100</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-muted-foreground">Total Marks</p>
                <p className="text-2xl font-bold text-green-700">200</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-muted-foreground">Duration</p>
                <p className="text-2xl font-bold text-orange-700">60 min</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-muted-foreground">Negative Marking</p>
                <p className="text-2xl font-bold text-red-700">−0.50</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
              <p className="font-semibold text-gray-700">Sections:</p>
              <ul className="space-y-1 text-gray-600">
                <li>Part A — General Intelligence & Reasoning (Q.1–25)</li>
                <li>Part B — General Awareness (Q.26–50)</li>
                <li>Part C — Quantitative Aptitude (Q.51–75)</li>
                <li>Part D — English Comprehension (Q.76–100)</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm space-y-1">
              <p className="font-semibold text-amber-800">Instructions:</p>
              <ul className="text-amber-700 space-y-1 list-disc list-inside">
                <li>+2 marks for each correct answer</li>
                <li>−0.50 marks for each wrong answer</li>
                <li>No marks for unanswered questions</li>
                <li>Timer starts immediately — auto-submits at 60 minutes</li>
                <li>You can navigate between questions using the palette</li>
                <li>Mark questions for review and come back later</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  Enter Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStart()}
                  className="h-12 text-lg"
                  autoFocus
                />
              </div>
              <Button
                onClick={handleStart}
                disabled={!name.trim() || loading}
                className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                {loading ? "Loading Quiz..." : "Start Exam"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          SSC CGL Tier 1 — 12 Sep 2025 (Shift-1) | For practice purposes only
        </p>
      </div>
    </div>
  );
}
