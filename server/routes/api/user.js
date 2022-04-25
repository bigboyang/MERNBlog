import express from "express";
import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";

// Model
import User from "../../models/user";
import config from "../../config";
const { JWT_SECRET } = config;

const router = express.Router();

// @routes GET api/user
// @desc Get all user
// @access public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) throw Error("No Users");

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

// @routes POST api/user
// @desc Register user
// @access public
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (name === "" || email === "" || password === "") {
      return res.status(400).json({ msg: "모든 필드를 체워주세요" });
    }

    // 기존유저가 있다면
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다" });
      }
    });
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      // 2의10승
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  } catch (error) {
    console.log();
  }
});

export default router;
