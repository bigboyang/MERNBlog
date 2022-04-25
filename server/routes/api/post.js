import express from "express";
import auth from "../../middleware/auth";

// Model
import Post from "../../models/post";

const router = express.Router();
// api/post
router.get("/", async (req, res) => {
  // req요청, res응답
  const postFindResult = await Post.find();
  console.log(postFindResult, " All Post Get");
  res.json(postFindResult);
});

router.post("/", auth, async (req, res, next) => {
  // 토큰필요
  try {
    console.log(req, " req");
    const { title, contents, fileUrl, creator } = req.body;
    const newPost = await Post.create({
      // 원래 title:title 이렇게 해줘야함
      title,
      contents,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

export default router;
