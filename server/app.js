import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config";
import hpp from "hpp";
import cors from "cors";
import postsRouters from "./routes/api/post";
import userRouters from "./routes/api/user";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Success!"))
  .catch((e) => console.log(e));

// Use routes
app.get("/");
app.use("/api/post", postsRouters);
app.use("/api/user", userRouters);
// 모듈화
export default app;
