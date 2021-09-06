import { Link, matchPath } from "react-router-dom";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Leftside } from "../Layout/Leftside";
import Header from "../Layout/Header";
import { Footer } from "../Layout/Footer";

import $ from "jquery";

const AfterLogin = (props) => {
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { default: e };
  }
  useEffect(() => {
    $("boddy").addClass("hold-transition sidebar-mini layout-fixed");
    var SELECTOR_PRELOADER = ".preloader";
    var $__default = /*#__PURE__*/ _interopDefaultLegacy($);
    setTimeout(function () {
      var $preloader = $__default["default"](SELECTOR_PRELOADER);

      if ($preloader) {
        $preloader.css("height", 0);
        setTimeout(function () {
          $preloader.children().hide();
        }, 200);
      }
    }, 600);
  });

  var routeName = props.children.props.routeName;
  return (
    <div className="wrapper">
      <div className="preloader flex-column justify-content-center align-items-center">
        <i className="fas fa-sync-alt fa-4x fa-spin"></i>
        <p className="text-dark">Loading......</p>
      </div>
      <Header routeName={routeName} />
      <Leftside routeName={routeName} />

      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>{routeName}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">{routeName}</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">{props.children}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};
function mapStateToProps(state) {
  const { loggingin, token } = state.authentication;
  // console.log("AUTHENTICATE USER", state.authentication);
  return {
    loggingin,
    token,
  };
}

const connectedHomePage = connect(mapStateToProps)(AfterLogin);
export default connectedHomePage;
