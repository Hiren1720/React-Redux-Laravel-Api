import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route } from "react-router-dom";
import { Leftside } from "../Layout/Leftside";
import userActions from "../_actions/user.action";
import PasswordService from "../_services/PasswordService";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { email: "" },
      type: "",
      errors: { email: this.props.success },
      success: this.props.success,
      loading: false,

    };
    // console.log("USER", this.state.responseEmail);

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.success == "Success") {
      swal({
        title: "Good job!",
        text: "Your Email is Varified...!",
        icon: "success",
        button: false,
        timer: 1500,
      });
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
    const { email } = this.state.user;
    const { dispatch } = this.props;
    if (this.validateForm()) {
      this.setState({ loading: true });
      dispatch(userActions.requestEmail(email));

      // console.log("SUCCESS", this.state.success);
      // if (res.data.email) {
      //   swal({
      //     title: "Invalid Email Address!",
      //     text: "Please Valid Email Address",
      //     icon: "error",
      //   });
      //   this.setState({ errors: res.data });
      // }
    }
  }
  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.user.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (this.state.user.email) {
      let pattern = new RegExp(
        /^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.user.email)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email example:admin@gmail.com";
      }
    }

    this.setState({ errors });
    return formIsValid;
  }
  render() {
    const success = this.props.success;
    // console.log("RESPONSE MAIL", success);
    if (success == "Success") {
      return <Redirect to="/createnewPassword" />;
    }
    const { email } = this.state;
    return (
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">
            You forgot your password? Here you can easily retrieve a new
            password.
          </p>

          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                name="email"
                value={email}
                className="form-control"
                placeholder="Email"
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

            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  {this.state.loading ? <i className="fas fa-circle-notch fa-spin" /> : 'Request new password'}
                </button>
              </div>
            </div>
          </form>

          <p className="mt-3 mb-1">
            <Link to="/login">Login</Link>
          </p>
          <p className="mb-0">
            <Link to="/register" className="text-center">
              Register a new membership
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loggingin = state.authentication.loggingin;
  const user = state.authentication.user;
  const success = state.authentication.success;
  return {
    loggingin,
    user,
    success,
  };
}

const connectedLoginPage = connect(mapStateToProps)(ForgotPassword);
export default connectedLoginPage;
