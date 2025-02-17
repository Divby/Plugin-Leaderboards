const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", postsController.getPost);

router.post("/createPost", postsController.createPost);

router.put("/likePost/:id", ensureAuth, postsController.likePost);

router.put("/savePost/:id", ensureAuth, postsController.savePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
