import userConstants from "../_constants/user.constants";
import { setToken } from "../http";
//  let user = JSON.parse(localStorage.getItem('user'));
const initialState = { loggingin: false };

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        loggingin: true,
        user: action.user,
      };
    case userConstants.REGISTER_SUCCESS:
      let registerToken = action.token;
      if (!!registerToken) {
        localStorage.setItem("token", action.token);
        setToken(registerToken);
      }
      return {
        loggingin: true,
        user: action.user,
        token: action.token,
      };
    case userConstants.REGISTER_FAILURE:
      return {
        loggingin: false,
        user: action.message,
      };
    case userConstants.EMAIL_REQUEST:
      return {
        loggingin: false,
        user: action.user,
      };
    case userConstants.EMAIL_SUCCESS:
      return {
        loggingin: false,
        user: action.user.responseEmail,
        success: action.user.Success,
      };
    case userConstants.EMAIL_FAILURE:
      return {
        loggingin: false,
        user: action.message,
      };
    case userConstants.PASSWORD_REQUEST:
      return {
        loggingin: false,
        user: action.user,
      };
    case userConstants.PASSWORD_SUCCESS:
      console.log("LOGIN TYPE", action.user);

      return {
        loggingin: false,
        success: action.user.success,
        // type: action.user.type,
      };
    case userConstants.PASSWORD_FAILURE:
      return {
        loggingin: false,
        user: action.message,
      };
    case userConstants.LOGIN_SUCCESS:
      //   console.log("LOGIN TYPE", action.user.type);
      let loginToken = action.user.token;
      if (!!loginToken) {
        localStorage.setItem("token", action.user.token);
        localStorage.setItem("type", action.user.type);
        setToken(loginToken);
      }
      return {
        loggingin: !!loginToken,
        token: action.user.token,
        type: action.user.type,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingin: false,
        user: action.message,
      };
    case userConstants.AUTH_CHECK:
      const token = localStorage.getItem("token");
      if (!!token) {
        setToken(token);
      }
      return {
        loggingin: !!token,
      };
    case userConstants.EDIT_REQUEST:
      const editToken = localStorage.getItem("token");
      if (!!token) {
        Http.defaults.headers.common["Authorization"] = `Berear ${editToken}`;
      }
      return {
        loggingin: !!editToken,
        user: action.user,
      };
    case userConstants.EDIT_SUCCESS:
      return {
        loggingin: true,
        user: action.user,
      };

    // case userConstants.GETALL_REQUEST:
    //     return {
    //         loggingin: true
    //         // user:action.user.user,
    //         // token:action.user.token
    //     };
    // case userConstants.GETALL_SUCCESS:

    //     return {
    //         items: action.user
    //     };
    // case userConstants.GETALL_FAILURE:
    //     return {
    //     error: action.error
    //     };
    case userConstants.LOGOUT:
      return {
        loggingin: false,
      };
    default:
      return state;
  }
}
