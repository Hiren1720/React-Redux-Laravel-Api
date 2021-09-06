import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import userActions from "../_actions/user.action";
import LoginService from "../_services/LoginService";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log("e", this.props);
    // console.log("Hello from", this.props.match.params);
    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
      name: "",
      email: "",
      errors: {},
      user: { id: "", name: "", email: "" },
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email } = this.state;
    const user = { name, email };
    const { history } = this.props;
    this.setState({ loading: true })
    LoginService.updateUser(user).then((res) => {
      history.push("/profile");
    });
  }
  componentDidMount() {
    LoginService.getUser().then((res) => {
      //   console.log("NAME", res.user);
      this.setState({ name: res.user.name, email: res.user.email });
    });
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
    const { name, email, password } = this.state;

    return (
      <div className="col-md-6 col-md-offset-3">
        <center>
          <div className="text-center">
            <img
              className="profile-user-img img-fluid img-circle"
              src="../../public/assets/dist/img/avatar5.png"
              alt="User profile picture"
            />
          </div>
        </center>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={"form-group"}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            {
              <div className="errorMsg text-danger">
                {this.state.errors.name}
              </div>
            }
          </div>
          <div className={"form-group"}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            {
              <div className="errorMsg text-danger">
                {this.state.errors.email}
              </div>
            }
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary" >
              Update {this.state.loading && <i className="fas fa-circle-notch fa-spin" />}
            </button>
            <br />
          </div>
        </form>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//     const  {edited}  = state.editedReducer;

//     return {
//         edited
//     };
// }

// const connectedEditProfilePage = connect(mapStateToProps)(EditProfile);
export default EditProfile;
