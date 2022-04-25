import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../types";

// Login
const loginUserAPI = (loginData) => {
  console.log(loginData, "loginData");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("/api/auth", loginData, config);
};

function* loginUser(action) {
  console.log(action, "action in LoginUser");
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result, "result in Saga");
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    console.log(error, "error in loginUser");
    yield put({
      // LOGIN_FAILURE 실행
      type: LOGIN_FAILURE,
      payload: error.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT
function* logout(action) {
  console.log(action, "action in logout");
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log(error, "error in logout");
  }
}

function* watchLogoutUser() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}
