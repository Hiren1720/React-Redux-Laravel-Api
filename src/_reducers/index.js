import { combineReducers } from "redux";
// import registerReducer from './registerReducer';

import authentication from "./authencation.reducer";
import alert from "./alert.reducer";

export const rootReducer = combineReducers({
  authentication,
  alert,
});
