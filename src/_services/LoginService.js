import { axios as Http, setToken } from "../http";
import { ApiUrl } from "./ApiUrl";
import {User} from './ApiHelper';

class LoginService {
  getUser() {
    return new Promise((resolve, reject) => {
      return Http.get(`${ApiUrl.UserApiUrl}${User.getUser}`)
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
    return Http.post(`${ApiUrl.UserApiUrl}${User.register}`, user);
  }

  getLogin(user) {
    // console.log("USER", user);
    return new Promise((resolve, reject) => {
      return Http.post(`${ApiUrl.UserApiUrl}${User.login}`, user)
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
    return Http.put(`${ApiUrl.UserApiUrl}${User.update}`, user);
  }

  // deleteEmployee(employeeId){
  //     return axios.delete(LOGIN_API_BASE_URL + '/' + employeeId + '/delete');
  // }
  // bulkDeleteEmployees(employees){
  //     return axios.post(LOGIN_API_BASE_URL +  '/destroy',employees);
  // }
}
export default new LoginService();
