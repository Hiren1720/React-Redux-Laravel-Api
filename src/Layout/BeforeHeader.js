import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import userActions from "../_actions/user.action";
class BeforeHeader extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.onClick = this.onClick.bind(this);
  //   }
  //   onClick() {
  //     let { dispatch } = this.props;
  //     dispatch(userActions.logout());
  //     localStorage.removeItem("token");
  //   }
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/employee/login" className="nav-link">
              Employee Login
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/login" className="nav-link">
              User Login
            </Link>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
            <a href="$" className="nav-link" >
              Logout
            </a>
          </li> */}
        </ul>
      </nav>
    );
  }
}

export default BeforeHeader;
