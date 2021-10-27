import { axios } from "../http";
import {ApiUrl} from "./ApiUrl";
import {Password} from './ApiHelper';
class PasswordService {
  requestEmail(user) {
    return axios.post(`${ApiUrl.UserApiUrl}${Password.password}${Password.forgotPassword}`, user);
  }
  resetPassword(user) {
    return axios.post(`${ApiUrl.UserApiUrl}${Password.password}${Password.resetPassword}`, user);
  }
}
export default new PasswordService();
