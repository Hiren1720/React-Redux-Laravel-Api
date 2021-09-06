import { Link, Route } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import LoginService from "../_services/LoginService";
import EmployeeServices from "../_services/EmployeeServices";
import EmployeeLoginServices from "../_services/EmployeeLoginServices";
export class Leftside extends Component {
  constructor(props) {
    super(props);
    // console.log("PROPS", props);
    this.state = {
      data: { id: "", name: "", email: "", profile_url: "" },
      type: "",
      loggingin: props.loggingin,
      token: props.token,
      routeName: props.routeName,
      page: "",
    };
  }
  componentDidMount() {
    const type = localStorage.getItem("type");
    if (type == "Admin") {
      LoginService.getUser().then((res) => {
        this.setState({ data: res.user });
        this.setState({ type: type });
      });
      EmployeeServices.getEmployees().then((res) => {
        // console.log("PAGE", res.data.employees.current_page);
        this.setState({ page: res.data.employees.current_page });
      });
    } else {
      EmployeeLoginServices.getEmployee().then((res) => {
        // console.log("RESPONSE DATA", res.employee);
        this.setState({ data: res.employee });
        this.setState({ type: type });
      });
    }
  }
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <div className="symbol bg-white-o-15 mr-3">
            <span className="symbol-label text-success font-weight-bold font-size-h4 ">
              {this.state.type ? this.state.type.charAt(0) : ""}
            </span>

          </div>
          <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5">
            {this.state.type}
          </div>

          {/* <span className="brand-text font-weight-light">
            {this.state.type}
          </span> */}
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/public/assets/dist/img/avatar5.png"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <Link to="/profile" className="d-block" title="Profile">
                {this.state.data.name}
              </Link>
            </div>
          </div>

          <nav className="mt-2">
            {this.state.type == "Admin" ? (
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item ">
                  <Link
                    to="/"
                    className={classnames(
                      "nav-link",
                      this.state.routeName == "Dashboard" ? "active" : ""
                    )}
                  >
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li
                  className={classnames(
                    "nav-item",
                    this.state.routeName == "Employees" ? "menu-open" : "",
                    this.state.routeName == "Add Employees" ? "menu-open" : ""
                  )}
                >
                  <a
                    href="#"
                    className={classnames(
                      "nav-link",
                      this.state.routeName == "Employees" ? "active" : "",
                      this.state.routeName == "Add Employees" ? "active" : ""
                    )}
                  >
                    <i className="nav-icon fa fa-users"></i>
                    <p>
                      Employees
                      <i className="right fas fa-angle-left"></i>
                      <span className="right badge badge-danger"></span>
                    </p>
                  </a>

                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/employee"
                        className={classnames(
                          "nav-link",
                          this.state.routeName == "Employees" ? "active" : ""
                        )}
                      >
                        <i className="far fa-eye nav-icon"></i>
                        <p>View Employees</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/addEmployee"
                        className={classnames(
                          "nav-link",

                          this.state.routeName == "Add Employees"
                            ? "active"
                            : ""
                        )}
                      >
                        <i className="fa fa-plus nav-icon"></i>
                        <p>Add Employee</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contacts"
                    className={classnames(
                      "nav-link",
                      this.state.routeName == "Contacts" ? "active" : ""
                    )}
                  >
                    <i className="nav-icon fa fa-phone"></i>
                    <p>Contacts</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/salarySearch"
                    className={classnames(
                      "nav-link",
                      this.state.routeName == "Search Salary" ? "active" : ""
                    )}
                  >
                    <i className="nav-icon fas fa-money-bill-alt"></i>
                    <p>Salary</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/calendar"
                    className={classnames(
                      "nav-link",
                      this.state.routeName == "Calendar" ? "active" : ""
                    )}
                  >
                    <i className="nav-icon fas fa-calendar-alt"></i>
                    <p>Calendar</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/rooms"
                    className={classnames(
                      "nav-link",
                      this.state.routeName == "Rooms" ? "active" : ""
                    )}
                  >
                    <i className="nav-icon fas fa-hotel"></i>
                    <p>Rooms</p>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link
                    to="/employeeSalary"
                    className={classnames(
                      "nav-link",
                      this.state.routeName == "Salary" ? "active" : ""
                    )}
                  >
                    <i className="nav-icon fas fa-money-bill-alt"></i>
                    <p>Salary</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fa fa-users"></i>
                  <p>
                    Employees
                    <span className="right badge badge-danger"></span>
                  </p>
                </a>

                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/employee" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>View Employees</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/addEmployee" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Add Employee</p>
                    </Link>
                  </li>
                </ul>
              </li> */}
              </ul>
            )}
          </nav>
        </div>
      </aside>
    );
  }
}
function mapStateToProps(state) {
  const { loggingin, token } = state.authentication;
  // console.log("AUTHENTICATE USER", state.authentication);
  return {
    loggingin,
    token,
  };
}

export default connect(mapStateToProps)(Leftside);
