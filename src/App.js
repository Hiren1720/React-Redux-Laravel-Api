import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./_helpers/store";
import userConstants from "./_constants/user.constants";
import Routes from "./Routes";

const authCheck = () => {
  return {
    type: userConstants.AUTH_CHECK,
  };
};

store.dispatch(authCheck());

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("app")
);
