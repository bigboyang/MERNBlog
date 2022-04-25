import express from "express";
import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config";
const { JWT_SECRET } = config;

// Model
import User from "../../models/user";

const router = express.Router();

// @route POST api/auth
// @desc Auth user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "유저가 존재하지 않습니다" });

    // Password검증
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다" });
      }
    });
    // password가 일치하면
    jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: "2 days" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
    // 메소드 끝
  });
});

router.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
});

// 토큰만 보내 정보를 받아오는 api
router.get("/user", auth, async (req, res) => {
  console.log(req);
  try {
    const user = await User.findById(req.user.id).select("-password"); // password는 뺴고 가져와조
    if (!user) throw Error("유저가 없습니다");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

export default router;
