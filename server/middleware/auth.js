import jwt from "jsonwebtoken";
import config from "../config/index";
const { JWT_SECRET } = config;

const auth = (req, res, next) => {
  // 미들웨어
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "토큰없음 인증이 거부됨!!!!!!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "유효하지 않은 토큰" });
  }
};

export default auth;
