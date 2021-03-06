import { flush } from "redux-saga/effects";
import PostDetail from "../../routes/normalRoute/PostDetail";
import {
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_WRITE_REQUEST,
  POST_WRITE_FAILURE,
  POST_WRITE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_REQUEST,
} from "../types";

const initialState = {
  isAuthenticated: null,
  posts: [],
  PostDetail: "",
  postCount: "",
  loading: false,
  error: "",
  creatorId: "",
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_LOADING_SUCCESS:
      return {
        ...state,
        // ...state.posts,
        posts: [...action.payload],
        loading: false,
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
      };

    case POST_WRITE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_WRITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_WRITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
        loading: false,
      };
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
