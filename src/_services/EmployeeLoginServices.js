import { axios, setToken } from "../http";
import { ApiUrl } from "./ApiUrl";
const EMPLOYEE_LOGIN_API_BASE_URL = "http://localhost:8000/api-employee/employee";

class EmployeeLoginService {
  getEmployee() {
    return new Promise((resolve, reject) => {
      return axios
        .get(EMPLOYEE_LOGIN_API_BASE_URL)
        .then((res) => {
          // Object.keys(res.data).forEach(function(key){
          //     if(res.data[key] === null){
          //         res.data[key] = ''
          //     }
          // });
          // console.log("RESPONSE",res)
          return resolve(res.data);
        })
        .catch((error) => {
          return reject(error);

          // console.log("ERROR",error)
        });
    });
  }
  getSalaryById(salaryId) {
    return axios.get(EMPLOYEE_LOGIN_API_BASE_URL + "/salary/" + salaryId);
  }
  getSalary() {
    return axios.get(EMPLOYEE_LOGIN_API_BASE_URL + "/salary");
  }
  getEmployeeLogin(employee) {
    return new Promise((resolve, reject) => {
      return axios
        .post(EMPLOYEE_LOGIN_API_BASE_URL + "/login", employee)
        .then((res) => {
          setToken(res.data.token);
          window.location.href = "/";
          return resolve(res.data);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  updateEmployee(employee, employeeId) {
    return axios.post(
      EMPLOYEE_LOGIN_API_BASE_URL + "/update/" + employeeId,
      employee
    );
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMPLOYEE_LOGIN_API_BASE_URL + "/delete/" + employeeId);
  }
  bulkDeleteEmployees(employees) {
    return axios.post(EMPLOYEE_LOGIN_API_BASE_URL + "/destroy", employees);
  }
}
export default new EmployeeLoginService();
