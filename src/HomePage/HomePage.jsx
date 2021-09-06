import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import userActions from "../_actions/user.action";
import LoginService from "../_services/LoginService";
import userService from "../_services/user.service";
import EmployeeLoginServices from "../_services/EmployeeLoginServices";
import { contains } from "jquery";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // console.log("PROPS", this.props);
    this.state = {
      data: {
        id: "",
        name: "",
        email: "",
      },
      senior: "",
      employeeData: {
        id: "",
        name: "",
        email: "",
        phone: "",
        birthdate: "",
        gender: "",
        profile_url: "",
        city: "",
        address: "",
      },
      hobby: {
        reading: "",
        dancing: "",
        travelling: "",
        driving: "",
        photoGraphy: "",
      },
      loggingin: props.loggingin,
      token: props.token,
      employees: "",
      Partners: "",
      Partners: "",
      type: "",
    };
    console.log("Hobby", this.state.hobby);
  }

  componentDidMount() {
    const type = localStorage.getItem("type");
    if (type == "Admin") {
      LoginService.getUser().then((res) => {
        // console.log("DATA", res);
        this.setState({ data: res.user });
        this.setState({ employees: res.employees });
        this.setState({ Partners: res.Partners });
        this.setState({ type: type });
      });
    } else {
      EmployeeLoginServices.getEmployee().then((res) => {
        // console.log("EMPLOYEEHOBBY", res.employee.hobby);
        console.log("EMPLOYEE", res.senior);

        this.setState({ employeeData: res.employee });
        this.setState({ type: type });
        this.setState({ senior: res.senior });
      });
    }
  }

  render() {
    const { loggingin } = this.state;

    if (loggingin == false) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    return (
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {this.state.type == "Admin" ? (
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src="../../public/assets/dist/img/avatar5.png"
                        alt="User profile picture"
                      />
                    </div>

                    <h3 className="profile-username text-center">
                      <strong>Name:</strong>
                      {this.state.data.name}
                    </h3>

                    <p className="text-muted text-center">
                      <strong>Email:</strong>
                      {this.state.data.email}
                    </p>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Employees</b>{" "}
                        <a className="float-right">{this.state.employees}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Partners</b>{" "}
                        <a className="float-right">{this.state.Partners}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Friends</b> <a className="float-right">13,287</a>
                      </li>
                    </ul>
                    <Link
                      to="/editProfile"
                      className="btn btn-primary btn-block"
                    >
                      <b> Edit Profile</b>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src="../../public/assets/dist/img/avatar5.png"
                        alt="User profile picture"
                      />
                    </div>

                    <h3 className="profile-username text-center">
                      <strong>Name:</strong>
                      {this.state.employeeData.name}
                    </h3>

                    <p className="text-muted text-center">
                      <strong>Email:</strong>
                      {this.state.employeeData.email}
                    </p>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Date of birth</b>{" "}
                        <a className="float-right">
                          {this.state.employeeData.birthdate}
                        </a>
                      </li>
                      {/* <li className="list-group-item">
                        <b>Salary</b>{" "}
                        <Link to="/employeeSalary" className="float-right">
                          - per Month{" "}
                        </Link>
                      </li> */}
                      <li className="list-group-item">
                        <b>Phone</b>{" "}
                        <a className="float-right">
                          {this.state.employeeData.phone}
                        </a>
                      </li>
                      <li className="list-group-item">
                        <b>My Senior</b>{" "}
                        <a className="float-right">{this.state.senior} Sir</a>
                      </li>
                    </ul>
                    <Link
                      to="/employeeSalary"
                      className="btn btn-primary btn-block"
                    >
                      <b> View Salary Report</b>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {this.state.type == "Employee" ? (
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">About Me</h3>
                </div>

                <div className="card-body">
                  <strong>
                    <i className="fas fa-book mr-1"></i> Hobby
                  </strong>

                  <p className="text-muted">
                    {Object.keys(
                      JSON.parse(this.state.employeeData.hobby)
                    ).filter(
                      (hobby) =>
                        JSON.parse(this.state.employeeData.hobby)[hobby]
                    ) + ""}
                    {/* {this.state.employeeData.hobby} */}
                  </p>

                  <hr />

                  <strong>
                    <i className="fas fa-map-marker-alt mr-1"></i> Location
                  </strong>

                  <p className="text-muted">
                    {this.state.employeeData.address},
                    {this.state.employeeData.city}
                  </p>

                  <hr />

                  <strong>
                    <i className="fa fa-user mr-1"></i> Gender
                  </strong>

                  <p className="text-muted">{this.state.employeeData.gender}</p>

                  <hr />

                  <strong>
                    <i className="far fa-file-alt mr-1"></i> Notes
                  </strong>

                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam fermentum enim neque.
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export default connectedHomePage;
