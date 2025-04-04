import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vote",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Answer", answerSchema);
