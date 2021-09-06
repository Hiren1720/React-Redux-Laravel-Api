import { axios } from "../http";

const SALARY_API_BASE_URL = "http://localhost:8000/api/salary";

class SalaryService {
  getAllSalary() {
    return axios.get(SALARY_API_BASE_URL);
  }
  getSalary(employee) {
    // console.log("EMPLOYEE", employee);
    return axios.post(SALARY_API_BASE_URL + "/search", employee);
  }
  createSalary(formData, salaryId) {
    return axios.post(SALARY_API_BASE_URL + "/store/" + salaryId, formData);
  }
  getSalaryReport(salaryId) {
    return axios.get(SALARY_API_BASE_URL + "/report/" + salaryId);
  }
  getSalaryById(salaryId) {
    return axios.get(SALARY_API_BASE_URL + "/edit/" + salaryId);
  }

  updateSalary(salary, salaryId) {
    return axios.post(SALARY_API_BASE_URL + "/update/" + salaryId, salary);
  }

  deleteSalary(salaryId) {
    return axios.delete(SALARY_API_BASE_URL + "/delete/" + salaryId);
  }
  //   bulkDeleteEmployees(employees) {
  //     return axios.post(EMPLOYEE_API_BASE_URL + "/destroy", employees);
  //   }
}
export default new SalaryService();
