import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
} from "../types";
import { push } from "connected-react-router";

// All Posts load
const loadPostAPI = () => {
  return axios.get("/api/post");
};
function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log(result, "result in loadPost ");
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: error,
    });
    yield push("/");
  }
}
function* watchLoadPosts() {
  yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

// Postupload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.post("/api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    console.log(action, " uploadPost function");
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, " result in uploadPosts ");
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (error) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: error,
    });
    yield put(push("/"));
  }
}
function* watchUploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

// PostDetail
const loadPostDetailAPI = (payload) => {
  console.log("Detail id값 : " + payload);
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(" post_detail_saga_data : " + result);
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: error,
    });
    yield put(push("/"));
  }
}
function* watchUploadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPosts),
    fork(watchUploadPostDetail),
  ]);
}
