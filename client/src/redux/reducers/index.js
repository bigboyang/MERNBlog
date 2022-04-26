import { combineReducers } from "redux";
import { ConnectedRouter, connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    post: postReducer,
  });

export default createRootReducer;
