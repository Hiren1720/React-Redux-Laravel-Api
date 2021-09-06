import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EmployeeLoginServices from "../_services/EmployeeLoginServices";
const EmployeeSalary = (props) => {
  const { id } = props.match.params;
  const [salaries, setSalaries] = useState(null);
  const [error, setError] = useState("Records Not Found");
  useEffect(
    () => {
      if (salaries == null) {
        EmployeeLoginServices.getSalary().then((res) => {
          if (res.data.salary) {
            setSalaries(res.data.salary);
          } else {
            setError("Records not Found");
          }
        });
      }
    },
    [setSalaries],
    [salaries]
  );

  return (
    <div className="row">
      <div className="col-12">
        <div className="card-body">
          <table id="example1" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Index</th>
                <th>Salary</th>
                <th>Month</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Working Days</th>
                <th className="text-danger">Absent Days</th>
              </tr>
            </thead>
            <tbody>
              {salaries != null &&
                salaries.length > 0 &&
                salaries.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.salary}</td>
                    <td>{item.month}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>{item.working_days}</td>
                    <td className="text-danger">{item.absent_days}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EmployeeSalary;
