import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route } from "react-router-dom";

class EmployeeLogin extends React.Component {
  constructor(props) {
    super(props);
    console.log("Hello from", this.props);
    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      email: "",
      password: "",
      // submitted: false
      errors: {},
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.setState({ submitted: true });
    // const { email, password } = this.state;
    // const { dispatch } = this.props;
    // if (this.validateForm()) {
    //   dispatch(employeeActions.employeeLogin(email, password));
    // }
  }
  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (this.state.email) {
      // let error = localStorage.getItem('errors');
      // // console.log("LOCALSTORAGE",errors);
      // if(error == "Email"){
      //     formIsValid = false
      //     errors['email'] = "*This Email Is Already Exists";

      // }
      //regular expression for email validation
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
    this.setState({ errors });
    return formIsValid;
  }
  render() {
    // const { loggingin } = this.props;

    // if (loggingin == true) {
    //   return <Redirect to="/" />;
    // }
    const { email, password, submitted } = this.state;
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
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="errorMsg text-danger">
              {this.state.errors.password}
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
            </div>
          </form>

          <p className="mb-1">
            <a href="forgot-password.html">I forgot my password</a>
          </p>
          <p className="mb-0">
            <Link to="/register">Register a new membership</Link>
          </p>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   const loggingin = state.authentication.loggingin;
//   // console.log("Hello hiiii",loggingin)
//   return {
//     loggingin,
//   };
// }

// const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export default EmployeeLogin;
