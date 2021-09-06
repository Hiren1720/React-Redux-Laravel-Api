import { axios } from "../http";

const PASSWORD_API_BASE_URL = "http://localhost:8000/api/user/password";

class PasswordService {
  requestEmail(user) {
    return axios.post(PASSWORD_API_BASE_URL + "/requestEmail", user);
  }
  resetPassword(user) {
    return axios.post(PASSWORD_API_BASE_URL + "/resetPassword", user);
  }
}
export default new PasswordService();
