import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vote", voteSchema);
