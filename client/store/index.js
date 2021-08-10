import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import categories from "./categories";

const reducer = combineReducers({ categories });

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default store;
