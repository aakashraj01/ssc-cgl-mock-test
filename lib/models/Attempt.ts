import mongoose, { Schema, Document } from "mongoose";

export interface IAnswer {
  questionNo: number;
  selectedOption: string | null; // null = unanswered
  timeTakenSec: number;
}

export interface IAttempt extends Document {
  playerName: string;
  startedAt: Date;
  finishedAt: Date;
  totalTimeSec: number;
  answers: IAnswer[];
  score: number;
  correct: number;
  wrong: number;
  unanswered: number;
}

const AttemptSchema = new Schema<IAttempt>({
  playerName: { type: String, required: true },
  startedAt: { type: Date, required: true },
  finishedAt: { type: Date, required: true },
  totalTimeSec: { type: Number, required: true },
  answers: [
    {
      questionNo: { type: Number, required: true },
      selectedOption: { type: String, default: null },
      timeTakenSec: { type: Number, required: true },
    },
  ],
  score: { type: Number, required: true },
  correct: { type: Number, required: true },
  wrong: { type: Number, required: true },
  unanswered: { type: Number, required: true },
});

export default mongoose.models.Attempt ||
  mongoose.model<IAttempt>("Attempt", AttemptSchema);
