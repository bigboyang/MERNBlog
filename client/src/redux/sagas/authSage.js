import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
} from "../types";

// Loading token활용
const userLoadingAPI = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("/api/auth/user", config);
};
function* userLoading(action) {
  try {
    console.log(action, "action in userLoading");
    const result = yield call(userLoadingAPI, action.payload);
    console.log(result, "result in userLoadingSaga");
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    console.log(error, "error in userLoadingloginUser");
    yield put({
      // LOGIN_FAILURE 실행
      type: USER_LOADING_FAILURE,
      payload: error.response,
    });
  }
}
function* watchLoadingUser() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

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

// 회원가입 API요청함수
const registerUserAPI = (RegisterData) => {
  console.log(RegisterData, "RegisterData");
  return axios.post("/api/user", RegisterData);
};

function* registerUser(action) {
  console.log(action, "action in registerUser");
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result, "result in registerUserSaga");
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    console.log(error, "error in registerUser");
    yield put({
      type: REGISTER_FAILURE,
      payload: error.response,
    });
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// CLEAR ERROR
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
  }
}
function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchClearError),
    fork(watchLoadingUser),
  ]);
}
