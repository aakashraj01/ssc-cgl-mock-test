"use client";

interface QuestionPaletteProps {
  total: number;
  currentIndex: number;
  answers: (string | null)[];
  markedForReview: boolean[];
  onSelect: (index: number) => void;
}

export default function QuestionPalette({
  total,
  currentIndex,
  answers,
  markedForReview,
  onSelect,
}: QuestionPaletteProps) {
  const getColor = (i: number) => {
    if (i === currentIndex) return "ring-2 ring-blue-500 ring-offset-2";
    if (markedForReview[i] && answers[i])
      return "bg-purple-500 text-white";
    if (markedForReview[i]) return "bg-purple-300 text-white";
    if (answers[i]) return "bg-green-500 text-white";
    return "bg-gray-200 text-gray-600";
  };

  const sections = [
    { label: "Part A: Reasoning", start: 0, end: 25 },
    { label: "Part B: GK", start: 25, end: 50 },
    { label: "Part C: Quant", start: 50, end: 75 },
    { label: "Part D: English", start: 75, end: 100 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-green-500 inline-block" /> Answered
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-gray-200 inline-block" /> Not Answered
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-purple-500 inline-block" /> Marked
        </span>
      </div>

      {sections.map((section) => (
        <div key={section.label}>
          <p className="text-xs font-semibold text-gray-500 mb-1">{section.label}</p>
          <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: section.end - section.start }, (_, i) => {
              const idx = section.start + i;
              return (
                <button
                  key={idx}
                  onClick={() => onSelect(idx)}
                  className={`w-9 h-9 rounded text-xs font-semibold transition-all cursor-pointer hover:opacity-80 ${getColor(idx)}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
