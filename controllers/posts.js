// const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getHome: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("home.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment
        .find({ post: req.params.id })
        .populate("user", "userName")
        .sort({ createdAt: "desc" })
        .lean();
      res.render("post.ejs", {
        post: post,
        user: req.user,
        comments: comments
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
     

      await Post.create({
        plugin: req.body.plugin,
        company: req.body.company,
        category: req.body.category,
        freeOrPaid: req.body.freeOrPaid,
        link: req.body.link,
        likes: 0,
        userName: req.user.userName,
        user: req.user.id,

      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (post.likedBy.includes(req.user._id)) {

        await Post.findByIdAndUpdate(
          req.params.id,
          {
            $inc: {likes: -1},
            $pull: {likedBy: req.user._id}
          }
        )
        console.log("Upvote removed");
       
      } else {

      await Post.findByIdAndUpdate(
        req.params.id,
        {
          $inc: {likes: 1},
          $push: {likedBy: req.user._id}
        }
      )
      console.log("Likes +1");
      
    }
      if (req.headers.referer.includes("/home")) {
        return res.redirect("/home");
      } else {
        res.redirect(`/post/${req.params.id}`)
      }
      
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     if (req.headers.referer.includes("/home")) {
  //       return res.redirect("/home");
  //     } else {
  //       res.redirect(`/post/${req.params.id}`)
  //     }
      
  //   } catch (err) {
  //     console.log(err);
  //   }
 
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
