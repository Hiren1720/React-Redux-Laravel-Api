import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AfetrLogin from "../Layouts/AfterLogin";
const PrivateRoute = ({ component: Component, loggingin, ...rest }) => {
  //   console.log("rest", rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        // console.log("props", props);
        return loggingin ? (
          <AfetrLogin>
            <Component {...props} routeName={rest.routeName} />
          </AfetrLogin>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
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

export default connect(mapStateToProps)(PrivateRoute);
