import { axios } from "../http";
import {ApiUrl} from "./ApiUrl";
import {Employee} from './ApiHelper';
class EmployeeService {
  getEmployees(page) {
    // console.log("PAGE PAGE", page);
    let perPage = 2;
    return axios.get(
      `${ApiUrl.UserApiUrl}${Employee.getEmployees}?page=${page}&perPage=${perPage}`
    );
  }
  getCountEmployees(page) {
    let per_page = 5;
    return axios.get( `${ApiUrl.UserApiUrl}${Employee.getEmployees}?page=${page}&per_page=${per_page}`);
  }
  createEmployee(formData) {
    return axios.post(`${ApiUrl.UserApiUrl}${Employee.addEmployee}`, formData);
  }
  getEmployeeById(employeeId) {
    return axios.get(`${ApiUrl.UserApiUrl}${Employee.editEmployee}` + employeeId);
  }
  // getEmployeesAll() {
  //   return axios.get(EMPLOYEE_API_BASE_URL + "/all");
  // }
  updateEmployee(employee, employeeId) {
    return axios.post(
        `${ApiUrl.UserApiUrl}${Employee.updateEmployee}${employeeId}`,
      employee
    );
  }

  deleteEmployee(employeeId) {
    return axios.delete(`${ApiUrl.UserApiUrl}${Employee.deleteEmployee}${employeeId}`);
  }
  bulkDeleteEmployees(employees) {
    return axios.post(`${ApiUrl.UserApiUrl}${Employee.bulkDelete}`, employees);
  }
}
export default new EmployeeService();
