import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route } from "react-router-dom";
import userActions from "../_actions/user.action";
import swal from "sweetalert";
class CreateNewPassword extends React.Component {
  constructor(props) {
    super(props);
    console.log("Hello from", this.props);
    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      user: { email: this.props.email, password: "", confirmPassword: "" },
      type: "",
      errors: {},
      inputType: "password",
      showHide: "show",
      lock: "fas fa-lock",
    };
    // console.log("USER", this.state.user);
    this.hideShow = this.hideShow.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  hideShow() {
    let { lock, showHide, inputType } = this.state;
    if (lock == "fas fa-lock" && inputType == "password" && showHide == "show") {
      this.setState({ lock: "fas fa-lock-open", inputType: "text", showHide: "hide" })
    }
    else {
      this.setState({ lock: "fas fa-lock", inputType: "password", showHide: "show" })
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    const user = this.state.user;
    user[name] = value;
    this.setState({ user });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state.user;
    const { dispatch } = this.props;

    // if (this.validateForm()) {
    //   console.log("VARIFIED", password);
    dispatch(userActions.requestPassword(email, password));
    // }
  }
  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.user.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password";
    }
    if (this.state.user.password) {
      let error = localStorage.getItem("errors");
      if (error) {
        formIsValid = false;
        errors["password"] = "*Your Password is Incorrect";
      }
      if (
        !this.state.user.password.match(
          /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password";
      }
    }
    if (!this.state.user.confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please enter your Confirm Password";
    }
    if (this.state.user.confirmPassword != this.state.user.password) {
      formIsValid = false;
      errors["confirmPassword"] = "*Both Password Didn't Match";
    }
    if (
      !this.state.user.confirmPassword.match(
        /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/
      )
    ) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please enter secure and strong password";
    }

    if (!this.state.type) {
      formIsValid = false;
      errors["type"] = "*Please select Type";
    }
    if (this.state.type == "--Please Select Type--") {
      formIsValid = false;
      errors["type"] = "*Please select Type";
    }
    this.setState({ errors });
    return formIsValid;
  }
  render() {
    const { success } = this.props;

    if (success == "success") {
      return <Redirect to="/login" />;
    }
    const { email, password, confirmPassword } = this.state.user;
    return (
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">
            Your Email Varified Successfully...
            <br />
            Please Change Your Password
          </p>

          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                name="email"
                value={email}
                className="form-control"
                disabled
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type={this.state.inputType}
                name="password"
                value={password}
                className="form-control"
                placeholder="Password"
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <a onClick={this.hideShow}>{this.state.showHide}</a>&nbsp;
                  <span className={this.state.lock}></span>
                </div>
              </div>
            </div>
            <div className="errorMsg text-danger">
              {this.state.errors.password}
            </div>
            <div className="input-group mb-3">
              <input
                type={this.state.inputType}
                name="confirmPassword"
                value={confirmPassword}
                className="form-control"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <a onClick={this.hideShow}>{this.state.showHide}</a>&nbsp;
                  <span className={this.state.lock}></span>
                </div>
              </div>
            </div>
            <div className="errorMsg text-danger">
              {this.state.errors.confirmPassword}
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Change password
                </button>
              </div>
            </div>
          </form>

          <p className="mt-3 mb-1">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loggingin = state.authentication.loggingin;
  const email = state.authentication.user;
  const success = state.authentication.success;
  // console.log("Hello hiiii",loggingin)
  return {
    loggingin,
    email,
    success,
  };
}

const connectedLoginPage = connect(mapStateToProps)(CreateNewPassword);
export default connectedLoginPage;
