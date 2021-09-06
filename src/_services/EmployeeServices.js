import { axios } from "../http";

const EMPLOYEE_API_BASE_URL = "http://localhost:8000/api/employee";

class EmployeeService {
  getEmployees(page) {
    // console.log("PAGE PAGE", page);
    let perPage = 2;
    return axios.get(
      `http://localhost:8000/api/employee?page=${page}&perPage=${perPage}`
    );
  }
  getCountEmployees(page) {
    let per_page = 5;
    return axios.get(EMPLOYEE_API_BASE_URL + `/all?page=${page}&per_page=${per_page}`);
  }
  createEmployee(formData) {
    return axios.post(EMPLOYEE_API_BASE_URL + "/store", formData);
  }
  getEmployeeById(employeeId) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/edit/" + employeeId);
  }
  // getEmployeesAll() {
  //   return axios.get(EMPLOYEE_API_BASE_URL + "/all");
  // }
  updateEmployee(employee, employeeId) {
    return axios.post(
      EMPLOYEE_API_BASE_URL + "/update/" + employeeId,
      employee
    );
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/delete/" + employeeId);
  }
  bulkDeleteEmployees(employees) {
    return axios.post(EMPLOYEE_API_BASE_URL + "/destroy", employees);
  }
}
export default new EmployeeService();
