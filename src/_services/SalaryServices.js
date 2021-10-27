import { axios } from "../http";
import {ApiUrl} from './ApiUrl';
import {Salary} from "./ApiHelper";


class SalaryService {
  getAllSalary() {
    return axios.get(`${ApiUrl.UserApiUrl}${Salary.getSalary}`);
  }
  getSalary(employee) {
    // console.log("EMPLOYEE", employee);
    return axios.post(`${ApiUrl.UserApiUrl}${Salary.searchSalary}`, employee);
  }
  createSalary(formData, salaryId) {
    return axios.post(`${ApiUrl.UserApiUrl}${Salary.addSalary}${salaryId}`, formData);
  }
  getSalaryReport(salaryId) {
    return axios.get(`${ApiUrl.UserApiUrl}${Salary.reportSalary}${salaryId}`);
  }
  getSalaryById(salaryId) {
    return axios.get(`${ApiUrl.UserApiUrl}${Salary.editSalary}${salaryId}`);
  }

  updateSalary(salary, salaryId) {
    return axios.post(`${ApiUrl.UserApiUrl}${Salary.updateSalary}${salaryId}`, salary);
  }

  deleteSalary(salaryId) {
    return axios.delete(`${ApiUrl}${Salary.deleteSalary}${salaryId}`);
  }
  //   bulkDeleteEmployees(employees) {
  //     return axios.post(EMPLOYEE_API_BASE_URL + "/destroy", employees);
  //   }
}
export default new SalaryService();
