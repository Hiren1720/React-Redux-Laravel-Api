import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import BeforeLogin from "../Layouts/BeforeLogin";
const PublicRoute = ({ component: Component, loggingin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <BeforeLogin>
            <Component {...props} routeName={rest.routeName} />
          </BeforeLogin>
        );
      }}
    />
  );
};
function mapStateToProps(state) {
  const { loggingin } = state.authentication;
  return {
    loggingin,
  };
}

export default connect(mapStateToProps)(PublicRoute);
