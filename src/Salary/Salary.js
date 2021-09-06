import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReeValidate from "ree-validate";
import SalaryServices from "../_services/SalaryServices";
import swal from "sweetalert";
import { Modal, Button } from "react-bootstrap";
import classnames from "classnames";
import SalaryService from "../_services/SalaryServices";

const Salary = (props) => {
  const { id } = props.match.params;
  const { history } = props;
  const [salaries, setSalaries] = useState(null);
  const [error, setError] = useState("Records Not Found");
  const [modal, setModal] = useState({
    isOpen: false,
    id: "",
  });

  useEffect(
    () => {
      if (salaries == null) {
        SalaryServices.getSalaryReport(id).then((res) => {
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
  const validator = new ReeValidate.Validator({
    salary: "required|numeric",
    month: "required",
    start_date: "required",
    end_date: "required",
    working_days: "required",
    absent_days: "required",
  });
  const [editSalary, setEditSalary] = useState({
    salary: "",
    month: "",
    start_date: "",
    end_date: "",
    working_days: "",
    absent_days: "",
  });

  let [errors, setErrors] = useState(validator.errors);
  const editClick = (event) => {
    let id = event.target.id;
    SalaryService.getSalaryById(id).then((res) => {
      setEditSalary(res.data);
    });
    setModal({ ...modal, isOpen: true, id: id });
  }
  const closeModal = () => setModal({ ...modal, isOpen: false });
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
        SalaryServices.deleteSalary(id).then((res) => {
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
  const toggleModal = () => {
    setModal({ ...modal, isOpen: false });
  };
  const onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let { errors } = validator;
    errors.remove(name);
    setEditSalary({ ...editSalary, [name]: value });
    validator.validate(name, value).then(() => {
      setErrors(errors);
    });
  };
  const [loading, setloading] = useState(false);
  const updateSalary = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let formData = new FormData();
    const { errors } = validator;
    const valid = validator.validateAll(editSalary);
    valid.then((success) => {
      if (success) {
        setloading(true);
        setEditSalary(editSalary);
        for (let key in editSalary) {
          formData.append(key, editSalary[key]);
        }
        SalaryService.updateSalary(formData, id).then((res) => {

          if (res.data == "success") {
            swal({
              title: "Good job!",
              text: "Salary Updated successfully...!",
              icon: "success",
              button: false,
              timer: 1500,
            });
            setModal({ ...modal, isOpen: false });
            // history.push("/salary")
          }
        });
      } else {
        setErrors(errors);
      }
    });
  }
  let { salary, month, start_date, end_date, working_days, absent_days } =
    editSalary;
  return (
    <div className="row">
      <div className="col-12">
        <div className="card-body">
          <table className="table table-bordered table-hover ">
            <thead>
              <tr>
                <th>Index</th>
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
                    <td>{item.salary}</td>
                    <td>{item.month}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>{item.working_days}</td>
                    <td className="text-danger">{item.absent_days}</td>
                    <td>
                      &nbsp;
                      {/* <Link to={`/salary/edit/${item.id}`}> */}
                      <i
                        className="fas fa-edit fa-2x text-success"
                        title="Edit Salary"
                        onClick={editClick} id={item.id}></i>
                      {/* </Link> */}
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
      <Modal show={modal.isOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Salary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <div
              className={classnames("form-group", {
                error: errors.has("salary"),
              })}
            >
              <label>Salary:</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Salary"
                  name="salary"
                  value={salary}
                  onChange={onChange}
                />
              </div>
            </div>
            {errors.has("salary") && (
              <div id="name-error" className="error text-danger" htmlFor="salary">
                {errors.first("salary")}
              </div>
            )}
            <div
              className={classnames("form-group", {
                error: errors.has("month"),
              })}
            >
              <label>Month:</label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <input
                  type="month"
                  className="form-control"
                  data-mask
                  name="month"
                  value={month}
                  onChange={onChange}
                  placeholder="Month"
                />
              </div>
            </div>
            {errors.has("month") && (
              <div id="name-error" className="error text-danger" htmlFor="month">
                {errors.first("month")}
              </div>
            )}
            <div
              className={classnames("form-group", {
                error: errors.has("start_date"),
              })}
            >
              <label>Start_date:</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="far fa-calendar-alt"></i>
                  </span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  data-inputmask-alias="datetime"
                  data-inputmask-inputformat="dd/mm/yyyy"
                  data-mask
                  name="start_date"
                  value={start_date}
                  onChange={onChange}
                />
              </div>
            </div>
            {errors.has("start_date") && (
              <div
                id="name-error"
                className="error text-danger"
                htmlFor="start_date"
              >
                {errors.first("start_date")}
              </div>
            )}
            <div
              className={classnames("form-group", {
                error: errors.has("end_date"),
              })}
            >
              <label>End_date:</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="far fa-calendar-alt"></i>
                  </span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  data-inputmask-alias="datetime"
                  data-inputmask-inputformat="dd/mm/yyyy"
                  data-mask
                  name="end_date"
                  value={end_date}
                  onChange={onChange}
                />
              </div>
            </div>
            {errors.has("end_date") && (
              <div
                id="name-error"
                className="error text-danger"
                htmlFor="end_date"
              >
                {errors.first("end_date")}
              </div>
            )}

            <div
              className={classnames("form-group", {
                error: errors.has("working_days"),
              })}
            >
              <label>Working days:</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="working_days"
                  name="working_days"
                  value={working_days}
                  onChange={onChange}
                />
              </div>
              {errors.has("working_days") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="working_days"
                >
                  {errors.first("working_days")}
                </div>
              )}
            </div>
            <div
              className={classnames("form-group", {
                error: errors.has("absent_days"),
              })}
            >
              <label>Absent days:</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="absent_days"
                  name="absent_days"
                  value={absent_days}
                  onChange={onChange}
                />
              </div>
              {errors.has("absent_days") && (
                <div
                  id="name-error"
                  className="error text-danger"
                  htmlFor="absent_days"
                >
                  {errors.first("absent_days")}
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" id={modal.id} onClick={updateSalary}>
            {loading ? <i className="fas fa-circle-notch fa-spin" /> : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Salary;
