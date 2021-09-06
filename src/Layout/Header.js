import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import userActions from "../_actions/user.action";
import classnames from "classnames";
class Header extends Component {
  constructor(props) {
    super(props);
    // console.log("PROPS", props);
    this.state = { routeName: props.routeName };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    let { dispatch } = this.props;
    dispatch(userActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("type");
  }

  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li
            className={classnames(
              "nav-item d-none d-sm-inline-block",
              this.state.routeName == "Dashboard" ? "active" : ""
            )}
          >
            <Link to="/" className="nav-link">
              <i className="fas fa-home" title="Home"></i>
            </Link>
          </li>
          <li
            className={classnames(
              "nav-item d-none d-sm-inline-block",
              this.state.routeName == "Contacts" ? "active" : ""
            )}
          >
            <Link to="/contacts" className="nav-link">
              <i className="fas fa-phone-alt" title="Contacts"></i>
            </Link>
          </li>
          <li
            className={classnames(
              "nav-item d-none d-sm-inline-block",
              this.state.routeName == "Calendar" ? "active" : ""
            )}
          >
            <Link to="/calendar" className="nav-link">
              <i className="fas fa-calendar-alt" title="Calendar"></i>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item d-none d-sm-inline-block">

            <i className="fas fa-sign-out-alt" title="Sign out" onClick={this.onClick}></i>

          </li>
        </ul>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  const { loggingin, token } = state.authentication;
  return {
    loggingin,
    token,
  };
}

export default connect(mapStateToProps)(Header);
