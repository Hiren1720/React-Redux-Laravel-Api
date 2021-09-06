import userConstants from "../_constants/user.constants";
import userService from "../_services/user.service";
import alertActions from "./alert.action";
import history from "../_helpers/history";

const userActions = {
  register,
  requestEmail,
  requestPassword,
  login,
  logout,
  getAll,
};
function register(name, email, password) {
  return (dispatch) => {
    dispatch(request({ name, email, password }));

    userService.register(name, email, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function request(user) {
    return {
      type: userConstants.REGISTER_REQUEST,
      user,
    };
  }
  function success(user) {
    return {
      type: userConstants.REGISTER_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: userConstants.REGISTER_FAILURE,
      error,
    };
  }
}
function requestEmail(email) {
  // console.log("REQUEST EMAIL ACTION", email);
  return (dispatch) => {
    dispatch(request({ email }));
    userService.requestEmail(email).then(
      (user) => {
        // console.log("USER", user);
        dispatch(success(user));
        // history.push("/createnewPassword");
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function request(user) {
    return {
      type: userConstants.EMAIL_REQUEST,
      user,
    };
  }
  function success(user) {
    return {
      type: userConstants.EMAIL_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: userConstants.EMAIL_FAILURE,
      error,
    };
  }
}
function requestPassword(email, password) {
  return (dispatch) => {
    dispatch(request({ email, password }));
    userService.requestPassword(email, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/login");
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function request(user) {
    return {
      type: userConstants.PASSWORD_REQUEST,
      user,
    };
  }
  function success(user) {
    return {
      type: userConstants.PASSWORD_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: userConstants.PASSWORD_FAILURE,
      error,
    };
  }
}
function login(email, password, type) {
  return (dispatch) => {
    dispatch(request({ email, password, type }));

    userService.login(email, password, type).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function request(user) {
    return {
      type: userConstants.LOGIN_REQUEST,
      user,
    };
  }
  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error,
    };
  }
}

function logout() {
  userService.logout();
  return {
    type: userConstants.LOGOUT,
  };
}
function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function request() {
    return {
      type: userConstants.GETALL_REQUEST,
    };
  }
  function success(user) {
    return {
      type: userConstants.GETALL_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: userConstants.GETALL_FAILURE,
      error,
    };
  }
}
export default userActions;
