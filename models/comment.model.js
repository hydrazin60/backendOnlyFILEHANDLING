import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author ID is required"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ authorId: 1, postId: 1 });

const Comment = mongoose.model("Comment", postSchema);
export default Comment;
