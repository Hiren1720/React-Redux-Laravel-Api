import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route } from "react-router-dom";
import userActions from "../_actions/user.action";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("Hello from", this.props);
    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      email: "hiren@gmail.com",
      password: "Hiren@1234",
      type: "Admin",
      inputType: "password",
      errors: {},
      showHide: "show",
      lock: "fas fa-lock",
      loading: false
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lockClick = this.lockClick.bind(this);
  }
  componentDidMount() {
    if (this.props.success == "success") {
      swal({
        title: "Good job!",
        text: "Your Password is Updated!",
        icon: "success",
        button: false,
        timer: 2000,
      });
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  lockClick() {
    let _lock = this.state.lock;
    let _inputType = this.state.inputType;
    let _showhide = this.state.showHide;
    if (_lock == "fas fa-lock" && _inputType == "password" && _showhide == "show") {
      this.setState({ lock: "fas fa-lock-open", showHide: "hide", inputType: "text" })
    }
    else {
      this.setState({ lock: "fas fa-lock", showHide: "show", inputType: "password" })
    }
  }
  handleSubmit(e) {
    e.preventDefault();


    const { email, password, type } = this.state;
    const { dispatch } = this.props;
    if (this.validateForm()) {
      this.setState({ loading: true });
      dispatch(userActions.login(email, password, type));
    }
  }
  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (this.state.email) {
      let pattern = new RegExp(
        /^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.email)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email example:admin@gmail.com";
      }
    }
    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password";
    }
    if (this.state.password) {
      let error = localStorage.getItem("errors");
      if (error) {
        formIsValid = false;
        errors["password"] = "*Your Password is Incorrect";
      }
      if (
        !this.state.password.match(
          /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password";
      }
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
    const { loggingin } = this.props;

    if (loggingin == true) {
      return <Redirect to="/" />;
    }
    const { email, password, type, submitted } = this.state;
    return (
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="errorMsg text-danger">
              {this.state.errors.email}
            </div>
            <div className="input-group mb-3">
              <input
                type={this.state.inputType}
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <a onClick={this.lockClick}>{this.state.showHide}</a>&nbsp;
                  <span className={this.state.lock} ></span>
                </div>
              </div>
            </div>
            <div className="errorMsg text-danger">
              {this.state.errors.password}
            </div>
            <div className="input-group mb-3">
              <select
                name="type"
                value={type}
                className="form-control"
                onChange={this.handleChange}
              >
                <option>--Please Select Type--</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
              <div className="input-group-append">
                <div className="input-group-text">
                  <i className="fas fa-chevron-circle-down"></i>
                </div>
              </div>
            </div>
            <div className="errorMsg text-danger">{this.state.errors.type}</div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>

              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block" >
                  {this.state.loading ? <i className="fas fa-circle-notch fa-spin" /> : 'Sign In'}
                </button>
              </div>
            </div>
          </form>

          <p className="mb-1">
            <Link to="/forgotPassword">I forgot my password</Link>
          </p>
          <p className="text-danger">
            <strong>Note:</strong>Only Admin Can Reset Password
          </p>
          <p className="mb-0">
            <Link to="/register">Register a new membership Only Admin</Link>
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loggingin = state.authentication.loggingin;
  const success = state.authentication.success;
  // console.log("Hello success", success);
  return {
    loggingin,
    success,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export default connectedLoginPage;
