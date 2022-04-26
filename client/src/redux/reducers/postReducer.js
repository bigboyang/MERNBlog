import { flush } from "redux-saga/effects";
import PostDetail from "../../routes/normalRoute/PostDetail";
import {
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
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
    default:
      return state;
  }
}
