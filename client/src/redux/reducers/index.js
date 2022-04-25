import { combineReducers } from "redux";
import { ConnectedRouter, connectRouter } from "connected-react-router";
import authReducer from "./authReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });

export default createRootReducer;
