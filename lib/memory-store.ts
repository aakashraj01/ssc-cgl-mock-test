export interface StoredAttempt {
  _id: string;
  playerName: string;
  startedAt: Date;
  finishedAt: Date;
  totalTimeSec: number;
  answers: {
    questionNo: number;
    selectedOption: string | null;
    timeTakenSec: number;
  }[];
  score: number;
  correct: number;
  wrong: number;
  unanswered: number;
}

declare global {
  // eslint-disable-next-line no-var
  var attemptStore: Map<string, StoredAttempt> | undefined;
}

if (!global.attemptStore) {
  global.attemptStore = new Map();
}

export const attemptStore = global.attemptStore;

let counter = 0;
export function generateId(): string {
  counter++;
  return `local_${Date.now()}_${counter}`;
}
