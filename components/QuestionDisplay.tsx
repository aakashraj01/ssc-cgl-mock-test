"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

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

interface QuestionDisplayProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (label: string) => void;
}

function renderRichText(text: string): React.ReactNode[] {
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
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function QuestionDisplay({
  question,
  selectedOption,
  onSelect,
}: QuestionDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="text-sm font-mono">
          Q.{question.questionNo}
        </Badge>
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Part {question.part}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {question.partName}
        </span>
      </div>

      {question.passage && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm leading-relaxed max-h-60 overflow-y-auto">
          <p className="font-semibold text-amber-800 mb-2">Passage:</p>
          <p className="text-gray-700 whitespace-pre-line">{question.passage}</p>
        </div>
      )}

      <p className="text-base leading-relaxed whitespace-pre-line font-medium">
        {renderRichText(question.questionText)}
      </p>

      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => onSelect(opt.label)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedOption === opt.label
                ? "border-blue-500 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-3 ${
                selectedOption === opt.label
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {opt.label}
            </span>
            <span className="text-sm">{renderRichText(opt.text)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
