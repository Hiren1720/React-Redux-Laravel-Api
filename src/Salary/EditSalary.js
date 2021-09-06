import React, { Component, useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import ReeValidate from "ree-validate";
import classnames from "classnames";
import SalaryService from "../_services/SalaryServices";

const EditSalary = (props) => {
  const { id } = props.match.params;
  const { history } = props;
  const validator = new ReeValidate.Validator({
    salary: "required|numeric",
    month: "required",
    start_date: "required",
    end_date: "required",
    working_days: "required",
    absent_days: "required",
  });
  const [loading, setLoading] = useState(false);
  const [editSalary, setEditSalary] = useState({
    salary: "",
    month: "",
    start_date: "",
    end_date: "",
    working_days: "",
    absent_days: "",
  });

  let [errors, setErrors] = useState(validator.errors);
  // console.log("ERRORS Value",errors)
  useEffect(
    () => {
      SalaryService.getSalaryById(id).then((res) => {
        setEditSalary(res.data);
      });
    },
    [setEditSalary],
    [editSalary]
  );
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

  const validateAndSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    const { errors } = validator;
    const valid = validator.validateAll(editSalary);
    valid.then((success) => {
      if (success) {
        setEditSalary(editSalary);
        for (let key in editSalary) {
          formData.append(key, editSalary[key]);
        }
        SalaryService.updateSalary(formData, id).then((res) => {
          if (res.data == "success") {
            history.push("/salarySearch")
            // swal({
            //   title: "Good job!",
            //   text: "Salary Updated successfully...!",
            //   icon: "success",
            //   button: false,
            //   timer: 1500,
            // });
          }
        });
      } else {
        setErrors(errors);
      }
    });
  };

  let { salary, month, start_date, end_date, working_days, absent_days } =
    editSalary;

  // console.log("ITEMS ERROR", errors);
  return (
    <div className="card-body row">
      <div className="col-5 text-center d-flex align-items-center justify-content-center">
        <div className="">
          <h2>
            Admin<strong>LTE</strong>
          </h2>
          <p className="lead mb-5">
            123 Testing Ave, Testtown, 9876 NA
            <br />
            Phone: +1 234 56789012
          </p>
        </div>
      </div>
      <div className="col-7">
        <form onSubmit={validateAndSubmit}>
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
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {loading ? <i className="fas fa-circle-notch fa-spin" /> : 'Update'}
            </button>
            &nbsp;&nbsp;
            <Link to="/salarySearch" className="btn btn-danger">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditSalary;
