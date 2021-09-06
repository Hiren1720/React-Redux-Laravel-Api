import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SalaryService from "../_services/SalaryServices";
import swal from "sweetalert";

const salarySearch = (props) => {
  const { id } = props.match.params;
  const { history } = props;
  const [salaries, setSalaries] = useState(null);
  const [employee, setEmployee] = useState({ name: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState("Records Not Found");
  useEffect(
    () => {
      if (salaries == null) {
        SalaryService.getAllSalary().then((res) => {
          if (res.data.salary) {
            console.log("NAME OF SALARY", res.data.salary)
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
  const onSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // employee[name] = value;
    setEmployee({ ...employee, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    // console.log("NAME", name);
    SalaryService.getSalary(employee).then((res) => {
      if (res.data.salary) {
        setSalaries(res.data.salary);
      } else {
        swal({
          title: "Error!",
          text: "Records Not Found...!",
          icon: "error",
          button: false,
          timer: 1500,
        });
      }
    });
  };
  const onClick = (event) => {
    let id = event.target.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      event: event,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        SalaryService.deleteSalary(id).then((res) => {
          setSalaries(res.data);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  // const PER_PAGE = 1;
  // const offset = currentPage * PER_PAGE;
  // const currentPageData = salaries
  //   .slice(offset, offset + PER_PAGE)
  //   .map(({ thumburl }) => <img src={thumburl} />);
  // const pageCount = Math.ceil(data.length / PER_PAGE);
  // function handlePageClick({ selected: selectedPage }) {
  //   setCurrentPage(selectedPage);
  // }
  const { name } = employee;
  return (
    <div className="row">
      <div className="col-12">
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="search"
                name="name"
                value={name}
                onChange={onSearch}
                className="form-control"
              />
              <br />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>

          <br />
          <br />
          <table id="example1" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Index</th>
                <th>Employee</th>
                <th>Salary</th>
                <th>Month</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Working Days</th>
                <th className="text-danger">Absent Days</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaries != null &&
                salaries.length > 0 &&
                salaries.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.employee.name}</td>
                    <td>{item.salary}</td>
                    <td>{item.month}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>{item.working_days}</td>
                    <td className="text-danger">{item.absent_days}</td>
                    <td>
                      &nbsp;
                      <Link to={`/salary/edit/${item.id}`}>
                        <i
                          className="fas fa-edit fa-2x text-success"
                          title="Edit Salary"
                        ></i>
                      </Link>
                      <i
                        id={item.id}
                        className="fas fa-trash-alt fa-2x text-danger"
                        onClick={onClick}
                        title="Delete Salary"
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default salarySearch;
