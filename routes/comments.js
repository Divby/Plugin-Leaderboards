const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth")





router.post("/createComment/:id", ensureAuth, commentsController.createComment);


// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;