"use client";

import { useEffect, useState, useCallback } from "react";

interface TimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  startTime: number;
}

export default function Timer({ totalSeconds, onTimeUp, startTime }: TimerProps) {
  const calcRemaining = useCallback(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, totalSeconds - elapsed);
  }, [totalSeconds, startTime]);

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      const r = calcRemaining();
      setRemaining(r);
      if (r <= 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [calcRemaining, onTimeUp]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const isLow = remaining < 300;
  const isCritical = remaining < 60;

  return (
    <div
      className={`font-mono text-lg font-bold px-4 py-2 rounded-lg border-2 transition-colors ${
        isCritical
          ? "bg-red-100 text-red-700 border-red-300 animate-pulse"
          : isLow
          ? "bg-orange-100 text-orange-700 border-orange-300"
          : "bg-green-50 text-green-800 border-green-200"
      }`}
    >
      {hours > 0 && `${hours.toString().padStart(2, "0")}:`}
      {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
