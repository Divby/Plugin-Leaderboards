const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  plugin: {
    type: String,
    required: true,
    // unique: true,
  },
  company: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  freeOrPaid: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  userName: {
    type: String,
    ref: "User"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase pllural of name
module.exports = mongoose.model("Post", PostSchema);
