import { all, fork } from "redux-saga/effects";
import axios from "axios";
import authSaga from "./authSage";
// import dotenv from "dotenv";
// dotenv.config();
axios.defaults.baseURL = "http://localhost:7000";

export default function* rootSaga() {
  // function* 여러 값을 반환가능하게 함
  yield all([fork(authSaga)]);
}
