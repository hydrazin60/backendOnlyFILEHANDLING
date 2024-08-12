import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  captions: {
    type: String,
    default: function () {
      const createdAt = new Date();
      return `post created on  ${createdAt.getDate()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`;
    },
  },

  images: { type: String, required: true },
  autherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
