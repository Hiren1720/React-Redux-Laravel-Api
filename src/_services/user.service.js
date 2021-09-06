import userActions from "../_actions/user.action";
import authHeader from "../_helpers/auth-header";
import LoginService from "./LoginService";
import EmployeeLoginService from "./EmployeeLoginServices";
import PasswordService from "../_services/PasswordService";
const userService = {
  register,
  edit,
  requestEmail,
  requestPassword,
  login,
  logout,
  getAll,
};

function requestEmail(email) {
  const user = { email };
  return PasswordService.requestEmail(user).then((res) => {
    return res.data;
  });
}
function register(name, email, password) {
  const user = { name, email, password };
  return LoginService.createUser(user).then((res) => {
    return res.data;
  });
}
function requestPassword(email, password) {
  const user = { email, password };
  return PasswordService.resetPassword(user).then((res) => {
    return res.data;
  });
}
function edit(name, email) {
  const user = { name, email };

  return LoginService.updateUser(user).then((res) => {
    console.log("EDITED DATA", res.data);
    // if(res.data.message == "User"){
    //     alert("User Was Already Added");
    // }else{
    //     localStorage.setItem('user',JSON.stringify(res.data));
    return res.data;
    // }
  });
}
function login(email, password, type) {
  const user = { email, password, type };

  if (user.type == "Admin") {
    return LoginService.getLogin(user).then((res) => {
      return res;
    });
  } else {
    console.log("ADMINuSER ELSE", user);

    return EmployeeLoginService.getEmployeeLogin(user).then((res) => {
      return res;
    });
  }
}

function logout() {
  localStorage.removeItem("token");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return LoginService.getUser(requestOptions).then((res) => {
    // console.log("RESPONSE GET ALL DATA",res.data)
    return res.data;
  });
}
// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }

export default userService;
