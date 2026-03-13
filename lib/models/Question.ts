import mongoose, { Schema, Document } from "mongoose";

export interface IOption {
  label: string; // "A", "B", "C", "D"
  text: string;
}

export interface IQuestion extends Document {
  questionNo: number;
  part: string;
  partName: string;
  questionText: string;
  options: IOption[];
  correctOption: string; // "A", "B", "C", "D"
  passage?: string;
}

const QuestionSchema = new Schema<IQuestion>({
  questionNo: { type: Number, required: true, unique: true },
  part: { type: String, required: true },
  partName: { type: String, required: true },
  questionText: { type: String, required: true },
  options: [
    {
      label: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  correctOption: { type: String, required: true },
  passage: { type: String },
});

export default mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);
