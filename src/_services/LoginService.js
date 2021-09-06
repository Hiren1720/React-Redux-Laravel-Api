import { axios as Http, setToken } from "../http";
import { ApiUrl } from "./ApiUrl";
const LOGIN_API_BASE_URL = `${ApiUrl}/user`;

class LoginService {
  getUser() {
    return new Promise((resolve, reject) => {
      return Http.get(LOGIN_API_BASE_URL)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((error) => {
          return reject(error);
          // console.log("ERROR",error)
        });
    });
  }

  createUser(user) {
    return Http.post(LOGIN_API_BASE_URL + "/register", user);
  }

  getLogin(user) {
    // console.log("USER", user);
    return new Promise((resolve, reject) => {
      return Http.post(LOGIN_API_BASE_URL + "/login", user)
        .then((res) => {
          setToken(res.data.token);
          return resolve(res.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  updateUser(user) {
    return Http.put(LOGIN_API_BASE_URL + "/update", user);
  }

  // deleteEmployee(employeeId){
  //     return axios.delete(LOGIN_API_BASE_URL + '/' + employeeId + '/delete');
  // }
  // bulkDeleteEmployees(employees){
  //     return axios.post(LOGIN_API_BASE_URL +  '/destroy',employees);
  // }
}
export default new LoginService();
