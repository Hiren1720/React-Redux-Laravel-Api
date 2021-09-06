import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import collectRoutes from "./collectRoutes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Index = () => {
  return (
    <Router>
      <Switch>
        {collectRoutes.map((route, i) => {
          if (route.auth) {
            return <PrivateRoute {...route} key={i} />;
          } else {
            return <PublicRoute {...route} key={i} />;
          }
        })}
      </Switch>
    </Router>
  );
};
export default Index;
