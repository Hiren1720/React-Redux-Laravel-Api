import React, { useEffect } from "react";

const BeforeLogin = (props) => {
  useEffect(() => {
    $("body").addClass(function (index, currentClass) {
      var addedClass;
      if (currentClass === "hold-transition sidebar-mini layout-fixed ") {
        addedClass = "hold-transition login-page";
      } else {
        addedClass = "hold-transition login-page";
      }
      return addedClass;
    });
  });
  var routeName = props.children.props.routeName;
  return (
    <div className="login-box">
      <div className="login-logo">
        <b>{routeName}</b>
      </div>

      {props.children}
    </div>
  );
};
export default BeforeLogin;
