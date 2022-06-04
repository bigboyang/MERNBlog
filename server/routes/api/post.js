import express from "express";
import auth from "../../middleware/auth";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import moment from "moment";

dotenv.config();

// Model
import Post from "../../models/post";
import Category from "../../models/category";
import User from "../../models/user";

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "blogjaykos96/upload",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalnamem, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

const router = express.Router();

// @route  POST api/post/image
// @DESC Create a Post
// @Access Private 나 이거 안씀
router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    res.json({ uploaded: true, url: req.files.map((v) => v.location) });
  } catch (error) {
    console.log(error);
    console.log("이미지등록 에러");
    res.json({ uploaded: false, url: null });
  }
});

// api/post
router.get("/", async (req, res) => {
  // req요청, res응답
  const postFindResult = await Post.find();
  console.log(postFindResult, " All Post Get");
  res.json(postFindResult);
});

// @route POST api/post
router.post("/", auth, async (req, res, next) => {
  // 토큰필요
  try {
    console.log(req, " req");
    const { title, contents, fileUrl, creator, category } = req.body;
    const newPost = await Post.create({
      // 원래 title:title 이렇게 해줘야함
      title,
      contents,
      fileUrl,
      creator,
      date: moment().format("YYYY-MM-DD hh:mm:ss"),
    });

    const findResult = await Category.findOne({
      categoryName: category,
    });

    console.log(findResult, "FindResult");

    if (findResult === null) {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id },
      });

      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
      return res.redirect(`/api/post/${newPost._id}`);
    } else {
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id },
      });
      await Post.findByIdAndUpdate(newPost._id, {
        category: findResult._id,
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id,
        },
      });
      return res.redirect(`/api/post/${newPost._id}`);
    }
  } catch (e) {
    console.log(e);
  }
});

// @route POST api/post/:id
// @desc DetailPost
// @Access Public
router.get("/:id", async (req, res, next) => {
  console.log("API 호출");
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();
    console.log(post, "postAPI");
    res.json(post);
  } catch (error) {
    console.log(error);
    next(e);
  }
});

export default router;
