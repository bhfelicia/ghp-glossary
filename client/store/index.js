import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import categories from "./categories";
import terms from "./terms";
import questions from "./questions";
import users from "./users";

const reducer = combineReducers({ categories, terms, questions, users });

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default store;
