import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route } from "react-router-dom";
import userActions from "../_actions/user.action";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // console.log("Hello from",this.props)
    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {},
      showHide: "show",
      lock: "fas fa-lock",
      inputType: "password",
      agree: false,
      disabled: true,
      loading: false
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.lockClick = this.lockClick.bind(this);
    this.agreeOnChange = this.agreeOnChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  agreeOnChange(e) {
    this.setState({ agree: e.target.checked })
  }
  lockClick() {
    let _lock = this.state.lock;
    let _showHide = this.state.showHide;
    let _inputType = this.state.inputType;
    if (_lock == "fas fa-lock" && _showHide == "show" && _inputType == "password") {
      this.setState({ lock: "fas fa-lock-open", showHide: "hide", inputType: "text" })
    }
    else {
      this.setState({ lock: "fas fa-lock", showHide: "show", inputType: "password" })
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { dispatch } = this.props;
    if (this.validateForm()) {
      this.setState({ loading: true });
      dispatch(userActions.register(name, email, password));
    }
    // console.log(this.state.errors)
  }
  validateForm() {
    let errors = {};
    let formIsValid = true;
    if (!this.state.name) {
      formIsValid = false;
      errors["name"] = "*Please enter your name";
    }
    if (this.state.name) {
      if (!this.state.name.match(/^\w+$/)) {
        formIsValid = false;
        errors["name"] = "*Please use alphanumeric characters only";
      }
    }
    if (!this.state.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (this.state.email) {
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
    const loggingin = this.props.loggingin;
    if (loggingin == true) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    const { name, email, password } = this.state;

    return (
      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">Register a new Account</p>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div className="errorMsg text-danger">{this.state.errors.name}</div>
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
                  <span className={this.state.lock}></span>
                </div>
              </div>
            </div>
            <div className="errorMsg text-danger">
              {this.state.errors.password}
            </div>
            {/* <div class="input-group mb-3">
                  <input type="password" class="form-control" placeholder="Retype password"/>
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                    </div>
                  </div>
                </div> */}
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="terms"
                    value="agree"
                    checked={this.state.agree}
                    onChange={this.agreeOnChange}
                  />
                  <label htmlFor="agreeTerms">
                    I agree to the <a href="#">terms</a>
                  </label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block" disabled={(this.state.agree) ? false : true}>
                  {this.state.loading ? <i className="fas fa-circle-notch fa-spin" /> : 'Register'}
                </button>
              </div>
            </div>
          </form>

          <Link to="/login">I already have an Account</Link>
          <br />

          <p className="text-danger">
            <strong>Note:</strong>Employyes can not Register
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingin } = state.authentication;
  // console.log("REEGISETR",{loggingin})
  return {
    loggingin,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export default connectedRegisterPage;
